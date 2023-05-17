const Joi = require('joi');
const mongoose = require('mongoose');

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('invalid');
  }
  return value;
};

const validateCreation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.string().custom(isObjectId).messages({
      invalid: 'The classes id must be a valid ObjectId',
    }).required(),
    member: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }).required(),
    date: Joi.date().max(Date.now()).min('1923-01-01').required(),
  });

  const validation = subscriptionValidation.validate({ ...req.body });
  if (Object.entries(req.body).length === 0) {
    validation.error = true;
    return res.status(400).json({
      message: 'The request body cannot be empty',
      data: undefined,
      error: true,
    });
  }
  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const subscriptionUpdateValidation = Joi.object({
    classes: Joi.string().custom(isObjectId).messages({
      invalid: 'The classes id must be a valid ObjectId',
    }),
    member: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }),
    date: Joi.date().max(Date.now()).min('1923-01-01'),
  });

  const validation = subscriptionUpdateValidation.validate({ ...req.body });
  if (Object.entries(req.body).length === 0) {
    validation.error = true;
    return res.status(400).json({
      message: 'The request body cannot be empty',
      data: undefined,
      error: true,
    });
  }
  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
