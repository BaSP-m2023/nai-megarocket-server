const fs = require('fs');

const express = require('express');

const router = express.Router();
const data = require('../data/trainer.json');

router.post('/post', (req, res) => {
  let newData = req.body;
  if (Object.entries(newData).length === 0) {
    return res.status(400).json({ success: false, msg: 'Please send data into the request.' });
  }
  const trainers = data.some((train) => newData.id === train.id);
  if (trainers) {
    return res.status(400).json({ success: false, msg: 'A trainer with this ID already exists.' });
  }
  const fields = Object.values(newData).every((field) => field !== '');
  if (!fields) {
    return res.status(400).json({ success: false, msg: 'You must specify all the fields for the new trainer.' });
  }
  const lastId = data[data.length - 1].id;
  newData = { id: lastId + 1, ...newData };
  data.push(newData);
  fs.writeFile('src/data/trainer.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });
  return res.status(200).json({ success: true, msg: 'Trainer created', trainer: newData });
});

module.exports = router;
