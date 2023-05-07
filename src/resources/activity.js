const express = require('express');
const fs = require('fs');

const router = express.Router();

const data = require('../data/activity.json');

router.get('/get', (req, res) => {
  if (data.length === 0) return res.status(404).json({ msg: 'There arent any activities' });
  return res.json(data);
});

router.get('/getById/:id', (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(parseInt(id, 10))) {
    return res.status(400).json({ success: false, msg: 'id must be a number.' });
  }
  const activityToSend = data.find((activity) => activity.id.toString() === id);
  if (!activityToSend) {
    return res.status(404).json({ success: false, msg: 'activity not found.' });
  }
  return res.status(200).json({ success: true, activity: activityToSend });
});

router.post('/post', (req, res) => {
  let newActivity = req.body;
  if (Object.entries(newActivity).length === 0) {
    return res.status(400).json({ success: false, msg: 'you need to specify the new activity.' });
  }
  const exists = data.some((activity) => newActivity.name === activity.name);
  if (exists) {
    return res.status(400).json({ success: false, msg: 'the activity has already exists.' });
  }
  const atributes = Object.values(newActivity).every((atribute) => atribute !== '');
  if (!atributes) {
    return res.status(400).json({ success: false, msg: 'you must specify all the fields for the new activity.' });
  }
  const lastId = data[data.length - 1].id;
  newActivity = { id: lastId + 1, ...newActivity };
  data.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });
  return res.status(200).json({ success: true, msg: 'activity created', activity: newActivity });
});

module.exports = router;
