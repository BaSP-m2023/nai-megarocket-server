const mongoose = require('mongoose');
const Activity = require('../models/activity');

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();

    if (!activities.length > 0) {
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
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const getActivitiesById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'This id has an invalid format',
        error: true,
      });
    }

    const activity = await Activity.findById(id);

    if (!activity) {
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
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const createActivities = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const noChanges = await Activity.findOne({ name, description });

    if (noChanges) {
      return res.status(400).json({
        message: 'There is nothing to change',
        error: true,
      });
    }
    const existingActivity = await Activity.findOne({ name });

    if (!existingActivity) {
      const newActivity = await Activity.create({
        name,
        description,
        isActive,
      });

      return res.status(201).json({
        message: 'Activity was successfully created',
        data: newActivity,
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
      error: error.message,
    });
  }
};

const updateActivities = async (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  try {
    const existingActivity = await Activity.findOne({ name: req.body.name });

    if (existingActivity) {
      return res.status(400).json({
        message: 'There is nothing to change',
        error: true,
      });
    }

    const activityToUpdated = await Activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        isActive,
      },
      { new: true },
    );

    if (!activityToUpdated) {
      return res.status(404).json({
        message: 'Activity was not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(201).json({
      message: 'Activity was succesfully updated',
      data: activityToUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
};

const deleteActivities = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id format',
        error: true,
      });
    }

    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({
        message: 'Activity was not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Activity ${activity.name} was successfully deleted`,
      data: activity,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

module.exports = {
  getAllActivities,
  getActivitiesById,
  createActivities,
  updateActivities,
  deleteActivities,
};
