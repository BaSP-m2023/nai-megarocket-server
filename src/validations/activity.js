const Joi = require('joi');
const mongoose = require('mongoose');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(5).max(250).required(),
    isActive: Joi.boolean(),
  });

  const validation = activityValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(20),
    description: Joi.string().min(5).max(50),
    isActive: Joi.boolean(),
  });

  const validation = activityValidation.validate(req.body);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

module.exports = {
  validateCreation,
  validateUpdate,
};
