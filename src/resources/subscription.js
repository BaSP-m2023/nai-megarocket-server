const express = require('express');
const fs = require('fs');
const subs = require('../data/subscription.json');

const router = express.Router();

function isValidDate(date) {
  const today = new Date();
  const actualDay = today.getDate();
  const actualMonth = today.getMonth();
  const actualYear = today.getFullYear();
  const dateArray = date.split('/');
  const day = parseInt(dateArray[1], 10);
  const month = parseInt(dateArray[0], 10);
  const year = parseInt(dateArray[2], 10);
  if (
    (year === actualYear && (month > (actualMonth + 1)
    || (month === (actualMonth + 1) && day >= actualDay)))
  ) {
    return true;
  }
  return false;
}

function isOnlyNumbers(string) {
  for (let i = 0; i < string.length; i += 1) {
    const code = string.charCodeAt(i);
    if (!(code >= 48 && code <= 57)) {
      return false;
    }
  }
  return true;
}

function isValidHour(hour) {
  const hours = hour.toString().substring(0, 2);
  const minutes = hour.toString().substring(3, 5);
  return (isOnlyNumbers(hours) && hours <= 23 && isOnlyNumbers(minutes) && minutes <= 59 && hour[2] === ':');
}

router.get('/get', (req, res) => {
  if (subs) {
    res.json(subs);
  }
});

router.get('/getById/:id', (req, res) => {
  const foundSubs = subs.find((sub) => sub.id.toString() === req.params.id);

  if (foundSubs) {
    res.send(foundSubs);
  } else res.status(400).send({ msg: `This id doesn't exist (${req.params.id})` });
});

router.post('/post', (req, res) => {
  const id = subs.length + 1;
  const newSub = { id, ...req.body };
  if (newSub.classId && newSub.memberId && newSub.date && newSub.schedule) {
    if (!isValidDate(newSub.date)) {
      res.send({ msg: 'Date format: mm/dd/yyyy and has to be between today and the end of the year' });
    }
    if (!isValidHour(newSub.schedule)) {
      res.send({ msg: 'Schedule format: hh:mm. 24hs format' });
    }
    subs.push(newSub);
    fs.writeFileSync('src/data/subscription.json', JSON.stringify(subs, null, 2));
    res.json({ msg: 'Subscrition created successfully' });
  } else {
    res.send({ msg: 'All fields are required' });
  }
});

module.exports = router;
