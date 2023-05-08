const express = require('express');
const fs = require('fs');
const activities = require('../data/activity.json');

const router = express.Router();

// eslint-disable-next-line consistent-return
router.put('/update/:id', (req, res) => {
  const activityId = req.params.id;
  const { name, description } = req.body;
  // eslint-disable-next-line no-shadow
  const activity = activities.find((activity) => activity.id === Number(activityId));
  if (!activity) {
    return res.status(404).json({ success: false, msg: 'Activity not found.' });
  }
  activity.name = name || activity.name;
  activity.description = description || activity.description;
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, msg: 'The activity could not be modified.' });
    }
    return res.status(200).json({ success: true, activity });
  });
});

// eslint-disable-next-line consistent-return
router.delete('/delete/:id', (req, res) => {
  const activityId = req.params.id;
  const index = activities.findIndex((activity) => activity.id === Number(activityId));
  if (index === -1) {
    return res.status(404).json({ success: false, msg: 'Activity not found.' });
  }
  const deletedActivity = activities.splice(index, 1);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, msg: 'The activity could not be deleted.' });
    }
    return res.status(200).json({ success: true, msg: `Activity ${activityId} deleted successfully`, data: deletedActivity[0] });
  });
});

module.exports = router;
