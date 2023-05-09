const express = require('express');
const fs = require('fs');
const activities = require('../data/activity.json');

const router = express.Router();

// eslint-disable-next-line consistent-return
router.put('/update/:id', (req, res) => {
  const activityId = req.params.id;
  const { name, description } = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, msg: 'Please send data into the request.' });
  }
  // eslint-disable-next-line no-shadow
  const activityIndex = activities.findIndex((activity) => activity.id === Number(activityId));
  if (activityIndex === -1) {
    return res.status(404).json({ success: false, msg: 'Activity not found.' });
  }
  const updatedActivity = {
    ...activities[activityIndex],
    name: name || activities[activityIndex].name,
    description: description || activities[activityIndex].description,
  };
  const updatedActivities = [...activities.slice(0, activityIndex),
    updatedActivity, ...activities.slice(activityIndex + 1)];
  fs.writeFile('src/data/activity.json', JSON.stringify(updatedActivities, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, msg: 'The activity could not be modified.' });
    }
    return res.status(200).json({ success: true, updatedActivity });
  });
});

// eslint-disable-next-line consistent-return
router.delete('/delete/:id', (req, res) => {
  const activityId = req.params.id;
  const activityIndex = activities.findIndex((activity) => activity.id === Number(activityId));
  if (activityIndex === -1) {
    return res.status(404).json({ success: false, msg: 'Activity not found.' });
  }

  const deletedActivity = activities.find((activity) => activity.id === Number(activityId));
  const updatedActivities = activities.filter((activity) => activity.id !== Number(activityId));

  fs.writeFile('src/data/activity.json', JSON.stringify(updatedActivities, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ success: false, msg: 'The activity could not be deleted.' });
    }
    return res.status(200).json({ success: true, msg: `Activity ${activityId} deleted successfully`, data: deletedActivity });
  });
});

module.exports = router;
