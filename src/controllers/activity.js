const mongoose = require('mongoose');
const Activity = require('../models/activity');

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
      if (activity !== null) {
        res.status(200).json({
          message: 'Activity updated correctly',
          data: activity,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `There is no activity with id:${id}`,
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred', error,
    }));
};

const deleteActivities = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  Activity.findByIdAndDelete(id)
    .then((activity) => {
      if (activity !== null) {
        res.status(200).json({
          message: 'Activity deleted',
          error: false,
        });
      } else {
        res.status(404).json({
          message: `There is no activity with id:${id}`,
          error: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred', error,
      });
    });
};

module.exports = {
  updateActivities,
  deleteActivities,
};
