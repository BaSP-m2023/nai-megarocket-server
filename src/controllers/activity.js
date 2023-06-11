const mongoose = require('mongoose');
const Activity = require('../models/activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activities) => {
      if (activities.length === 0) {
        return res.status(404).json({
          message: 'Activities not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activities list',
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
      message: 'This id has invalid format',
      error: true,
    });
  }
  return Activity.findById(id)
    .then((activity) => {
      if (activity == null) {
        return res.status(404).json({
          message: 'Activity was not found',
          data: activity,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Activity found! ${activity.name}`,
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
        message: 'Activity was succesfully created',
        data: result,
        error: false,
      }))
      .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
  }
  return res.status(400).json({
    message: 'This activity already exists',
    error: true,
  });
};

const updateActivities = async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  try {
    const existingActivity = await Activity.findOne({
      $and: [
        {
          $or: [{ name: req.body.name }],
        },
      ],
    });

    const isBodyEqualToDatabase = existingActivity
    && existingActivity.name === name
    && existingActivity.description === description;

    if (isBodyEqualToDatabase) {
      return res.status(400).json({
        message: 'There is nothing to change',
        error: true,
      });
    }

    if (!existingActivity) {
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        {
          name,
          description,
          isActive,
        },
        { new: true },
      );

      if (!updatedActivity) {
        return res.status(404).json({
          message: 'Activity was not found',
          data: undefined,
          error: true,
        });
      }

      return res.status(201).json({
        message: 'Activity was succesfully updated',
        data: updatedActivity,
        error: false,
      });
    }

    return res.status(400).json({
      message: 'This activity already exists',
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
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
          message: 'Activity was not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Activity ${activity.name} was succesfully deleted`,
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
