const Activity = require('../models/activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activitys) => {
      if (activitys.length > 0) {
        res.status(200).json({
          message: 'Complete activities list',
          data: activitys,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'There is no activities, you need to create some',
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getActivitiesById = (req, res) => {
  const { id } = req.params;
  Activity.findById(id)
    .then((activity) => {
      if (activity !== null) {
        res.status(200).json({
          message: `Activity with id: ${id}`,
          data: activity,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `There is no activity with id: ${id}`,
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};
const createActivities = async (req, res) => {
  const existingActivity = await Activity.findOne({ name: req.body.name });
  if (existingActivity) {
    res.status(409).json({
      message: 'Activity with that name already exists',
      error: true,
    });
  } else {
    const { name, description, isActive } = req.body;

    Activity.create({
      name,
      description,
      isActive,
    })
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
  }
};

module.exports = {
  getAllActivities,
  getActivitiesById,
  createActivities,
};
