const Joi = require('joi');
const mongoose = require('mongoose');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().trim().min(3).max(20)
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required.',
      }),
    description: Joi.string().trim().min(5).max(250)
      .required()
      .messages({
        'any.required': 'Description is required.',
        'string.empty': 'Description is required.',
        'string.min': 'Description must have at least 5 characters.',
      }),
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
    name: Joi.string().trim().min(3).max(20)
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required.',
      }),
    description: Joi.string().trim().min(5).max(250)
      .messages({
        'any.required': 'Description is required',
        'string.empty': 'Description is required.',
        'string.min': 'Description must have at least 5 characters',
      }),
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
