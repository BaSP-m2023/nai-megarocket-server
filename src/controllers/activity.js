const mongoose = require('mongoose');
const Activity = require('../models/activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activities) => {
      if (activities.length === 0) {
        return res.status(404).json({
          message: 'There is no activities',
          error: false,
        });
      }
      return res.status(200).json({
        message: 'Complete activities list',
        data: activities,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getActivitiesById = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Invalid activity id: ${id}`,
      error: true,
    });
  }
  return Activity.findById(id)
    .then((activity) => {
      if (activity == null) {
        return res.status(404).json({
          message: `There is no activity with id: ${id}`,
          error: false,
        });
      }
      return res.status(200).json({
        message: `Activity with id: ${id}`,
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};
const createActivities = async (req, res) => {
  const existingActivity = await Activity.findOne({ name: req.body.name });

  if (!existingActivity) {
    const { name, description, isActive } = req.body;
    return Activity.create({
      name,
      description,
      isActive,
    })
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
  }
  return res.status(409).json({
    message: 'Activity with that name already exists',
    error: true,
  });
};

module.exports = {
  getAllActivities,
  getActivitiesById,
  createActivities,
};
