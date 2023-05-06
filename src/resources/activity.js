const express = require('express');

const router = express.Router();

const data = require('../data/activity.json');

router.get('/', (req, res) => {
  res.json(data);
});

router.get('/:id', (req, res) => {
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

module.exports = router;
