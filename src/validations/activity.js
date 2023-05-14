const Joi = require('joi');
const mongoose = require('mongoose');
const Activity = require('../models/activity');

const validateUpdate = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(20),
    description: Joi.string().min(5).max(50),
    isActive: Joi.boolean(),
  });

  const validation = activityValidation.validate(req.body);
  const newActivity = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  Activity.findById(id)
    .then((actualActivity) => {
      if ((!newActivity.name || actualActivity.name === newActivity.name)
      && (!newActivity.description || newActivity.description === actualActivity.description)
      && (!newActivity.isActive || newActivity.isActive === actualActivity.isActive)) {
        return res.status(400).json({
          message: 'No changes have been made to the data',
          data: [actualActivity.isActive, newActivity.isActive],
          error: true,
        });
      } if (validation.error) {
        return res.status(400).json({
          message: `There was an error: ${validation.error}`,
          data: undefined,
          error: true,
        });
      }
      return next();
    })

    .catch((error) => res.status(500).json({ message: 'An error occurred', error }));
};

module.exports = { validateUpdate };
