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
  if (subs.length === 0) {
    return res.json({ message: 'Subscriptions data is empty' });
  }
  return res.send(subs);
});

router.get('/getById/:id', (req, res) => {
  const foundSubs = subs.find((sub) => sub.id.toString() === req.params.id);

  if (foundSubs) {
    res.send(foundSubs);
  } else {
    res.send({ msg: `This id doesn't exist (${req.params.id})` });
  }
});

router.post('/post', (req, res) => {
  let id;
  if (subs.length === 0) {
    id = 0;
  } else {
    id = subs[subs.length - 1].id;
  }
  const newSub = { id: id + 1, ...req.body };
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

router.put('/update/:id', (req, res) => {
  const subID = req.params.id;
  const subUpdate = subs.find((sub) => sub.id.toString() === subID);
  if (!subUpdate) {
    res.send('The id is not a valid subscription');
    return;
  }
  subUpdate.classId = req.body.classId || subUpdate.classId;
  if (!isValidDate(req.body.date)) {
    res.send({ msg: 'Date format: mm/dd/yyyy and has to be between today and the end of the year' });
  } else subUpdate.date = req.body.date || subUpdate.date;
  if (!isValidHour(req.body.schedule)) {
    res.send({ msg: 'Schedule format: hh:mm. 24hs format' });
  } else subUpdate.schedule = req.body.schedule || subUpdate.schedule;

  fs.writeFile('src/data/subscription.json', JSON.stringify(subs, null, 2), (err) => {
    if (err) {
      res.send('ERROR subscription can\'t be updated!');
    } else {
      res.send('Subscription updated');
    }
  });
});
router.delete('/delete/:id', (req, res) => {
  const subID = req.params.id;
  const subUpdate = subs.find((sub) => sub.id.toString() === subID);
  if (!subUpdate) {
    res.send('The id is not a valid subscription');
    return;
  }
  const filterSub = subs.filter((sub) => sub.id.toString() !== subID);
  fs.writeFile('src/data/subscription.json', JSON.stringify(filterSub, null, 2), (err) => {
    if (err) {
      res.send('ERROR Subscription can\'t be deleted!');
    } else {
      res.send('Subscription deleted');
    }
  });
});
module.exports = router;
