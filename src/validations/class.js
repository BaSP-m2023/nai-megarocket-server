const Joi = require('joi');

const validationUpdateClass = (req, res, next) => {
  const classUpdate = Joi.object({
    activity: Joi.string(),
    trainer: Joi.string(),
    day: Joi.string(),
    slots: Joi.number(),
    hour: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required(),
  });

  const validationsClass = classUpdate.validate(req.body);
  if (!validationsClass.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validationsClass.error.details[0].message}`,
  });
};
const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.date().min('now').required().messages({
      'date.min': 'Date cannot be in the past',
      'any.required': 'Date is required',
    }),
    hour: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required().messages({
      'string.pattern.base': 'Hour format must be HH:MM',
      'any.required': 'Hour is required',
    }),
    activity: Joi.string().pattern(/^[^\d]+$/).min(3).max(20)
      .required()
      .messages({
        'string.pattern.base': 'Activity cannot contain numbers',
        'string.empty': 'Activity cannot be empty',
        'any.required': 'Activity is required',
        'string.min': 'Activity must have at least {#limit} characters',
        'string.max': 'Activity must have at most {#limit} characters',
      }),
    trainer: Joi.string().pattern(/^[^\d]+$/).min(3).max(20)
      .required()
      .messages({
        'string.pattern.base': 'Trainer cannot contain numbers',
        'string.empty': 'Trainer cannot be empty',
        'any.required': 'Trainer is required',
        'string.min': 'Trainer must have at least {#limit} characters',
        'string.max': 'Trainer must have at most {#limit} characters',
      }),
    slots: Joi.number().min(0).max(25).required()
      .messages({
        'number.min': 'Slots cannot be negative',
        'number.max': 'Slots cannot be more than 25',
        'any.required': 'Slots are required',
      }),
  });

  const validation = classValidation.validate(req.body);

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
  validationUpdateClass,
  validateCreation,
};
