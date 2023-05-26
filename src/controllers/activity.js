const mongoose = require('mongoose');
const Activity = require('../models/activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activities) => {
      if (activities.length === 0) {
        return res.status(404).json({
          message: 'There are no activities',
          error: true,
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
          data: activity,
          error: true,
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
  const { name, description, isActive } = req.body;
  const existingActivity = await Activity.findOne({ name: req.body.name });
  if (!existingActivity) {
    return Activity.create({
      name,
      description,
      isActive,
    })
      .then((result) => res.status(201).json({
        message: 'New activity added correctly',
        data: result,
        error: false,
      }))
      .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
  }
  return res.status(409).json({
    message: 'Activity with that name already exists',
    error: true,
  });
};

const updateActivities = (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;
  Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
    },
    { new: true },
  )
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `There is no activity with id:${id}`,
          data: undefined,
          error: true,

        });
      }
      return res.status(201).json({
        message: 'Activity updated correctly',
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred', error,
    }));
};

const deleteActivities = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  return Activity.findByIdAndDelete(id)
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `There is no activity with id:${id}`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted',
        data: activity,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred', error,
      });
    });
};

module.exports = {
  getAllActivities,
  getActivitiesById,
  createActivities,
  updateActivities,
  deleteActivities,
};
