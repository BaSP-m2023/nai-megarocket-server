const Joi = require('joi');

const validateSuperAdminsCreation = (req, res, next) => {
  const superAdminsValidation = Joi.object({
    firstName: Joi.string().min(3).max(25).required()
      .label('First Name')
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required.',
      }),
    email: Joi.string().min(8).max(25).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
      .label('Email')
      .required()
      .messages({
        'string.pattern.base': 'Invalid email address format, must finish in \'.com\'',
        'any.required': 'Email is required.',
        'string.empty': 'Email is required.',
      }),
    password: Joi.string().min(8).max(16).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
      .label('Password')
      .required()
      .messages({
        'string.pattern.base': 'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
      }),
  });

  const validation = superAdminsValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validate = (req, res, next) => {
  const superAdminsValidation = Joi.object({
    firstName: Joi.string().min(3).max(25),
    email: Joi.string().min(8).max(25).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
      .label('Email')
      .messages({
        'string.pattern.base': 'Invalid email address format, must finish in \'.com\'',
        'any.required': 'Email is required.',
        'string.empty': 'Email is required.',
      }),
    password: Joi.string().min(8).max(16).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
      .label('Password')
      .messages({
        'string.pattern.base': 'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
      }),
  });

  const validation = superAdminsValidation.validate({ ...req.body });
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
  });
};

module.exports = {
  validate,
  validateSuperAdminsCreation,
};
