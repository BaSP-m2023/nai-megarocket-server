const Joi = require('joi');
const mongoose = require('mongoose');

const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('invalid');
  }
  return value;
};

const validationUpdateClass = (req, res, next) => {
  const classUpdate = Joi.object({
    activity: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }),
    trainer: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }),
    day: Joi.array()
      .min(1)
      .items(
        Joi.string()
          .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      )
      .messages({
        'array.min': 'Day must contain at least one element',
        'array.items': 'Day must be an array of strings representing the days of the week',
        'any.required': 'Day is required',
      }),
    slots: Joi.number().integer().min(5).max(15)
      .messages({
        'number.min': 'Slots cannot be less than 5',
        'number.max': 'Slots cannot be more than 15',
        'any.required': 'Slots are required',
      }),
    hour: Joi.string().pattern(/^(?:0[8-9]|1[0-9]|2[0-2]):[0-5][0-9]$/).messages({
      'string.pattern.base': 'Gym is only open between 8:00 and 22:00',
      'any.required': 'Hour is required',
    }),
  });

  const validationsClass = classUpdate.validate(req.body);
  if (!validationsClass.error) return next();
  return res.status(400).json({
    message: `${validationsClass.error.details[0].message}`,
  });
};
const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.array()
      .min(1)
      .items(
        Joi.string()
          .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      )
      .required()
      .messages({
        'array.min': 'Day must contain at least one element',
        'array.items': 'Day must be an array of strings representing the days of the week',
        'any.required': 'Day is required',
      }),
    hour: Joi.string().pattern(/^(?:0[8-9]|1[0-9]|2[0-2]):[0-5][0-9]$/).required().messages({
      'string.pattern.base': 'Gym is only open between 8:00 and 22:00',
      'any.required': 'Hour is required',
    }),
    activity: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }).required(),
    trainer: Joi.string().custom(isObjectId).messages({
      invalid: 'The member id must be a valid ObjectId',
    }).required(),
    slots: Joi.number().min(5).max(15).required()
      .messages({
        'number.min': 'Slots cannot be less than 5',
        'number.max': 'Slots cannot be more than 15',
        'any.required': 'Slots are required',
      }),
  });

  const validation = classValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }

  return res.status(400).json({
    message: `${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validationUpdateClass,
  validateCreation,
};
