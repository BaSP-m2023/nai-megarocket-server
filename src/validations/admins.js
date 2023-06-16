const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().regex(/^[A-Za-z]+\s?[A-Za-z]+$/).trim().min(3)
      .max(25)
      .messages({
        'string.pattern.base': 'Name must have only letters',
        'any.required': 'Name is required',
        'string.empty': 'Name is required.',
      }),
    lastName: Joi.string().regex(/^[A-Za-z]+\s?[A-Za-z]+$/).trim().min(3)
      .max(25)
      .messages({
        'string.pattern.base': 'Last name must have only letters',
        'any.required': 'Last name is required',
        'string.empty': 'Last name is required.',
      }),
    dni: Joi
      .number()
      .integer()
      .greater(99999)
      .less(1000000000)
      .messages({
        'number.base': 'the DNI must be a number',
        'number.greater': 'DNI must have at least 7 numbers',
        'number.less': 'DNI cannot have more than 9 numbers',
      }),
    phone: Joi
      .number()
      .integer()
      .messages({
        'number.base': 'Phone must be a number',
        'number.min': 'Phone must have exact 10 numbers',
      }),
    email: Joi
      .string()
      .trim()
      .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'The email is invalid',
      }),
    city: Joi
      .string()
      .trim()
      .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
      .min(5)
      .max(25)
      .messages({
        'string.min': 'City must have between 5 and 25 characters',
        'string.max': 'City must have between 5 and 25 characters',
      }),
    password: Joi.string().min(8).max(16).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
      .label('Password')
      .messages({
        'string.pattern.base': 'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
      }),
  });
  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateCreate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().regex(/^[A-Za-z]+\s?[A-Za-z]+$/).trim().min(3)
      .max(25)
      .required()
      .messages({
        'string.pattern.base': 'Name must have only letters',
        'any.required': 'Name is required',
        'string.empty': 'Name is required.',
      }),
    lastName: Joi.string().regex(/^[A-Za-z]+\s?[A-Za-z]+$/).trim().min(3)
      .max(25)
      .required()
      .messages({
        'string.pattern.base': 'Last name must have only letters',
        'any.required': 'Last name is required',
        'string.empty': 'Last name is required.',
      }),
    dni: Joi
      .number()
      .integer()
      .greater(99999)
      .less(1000000000)
      .required()
      .messages({
        'number.base': 'the DNI must be a number',
        'number.greater': 'DNI must have at least 7 numbers',
        'number.less': 'DNI cannot have more than 9 numbers',
      }),
    phone: Joi
      .number()
      .integer()
      .required()
      .messages({
        'number.base': 'Phone must be a number',
        'number.min': 'Phone must have between 9 and 10 numbers',
        'number.required': 'Phone is required',
      }),
    email: Joi
      .string()
      .trim()
      .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        'string.pattern.base': 'the email is invalid',
        'string.required': 'email is required',
      }),
    city: Joi
      .string()
      .trim()
      .regex(/^[A-Za-z]+\s?[A-Za-z]+$/)
      .min(5)
      .max(25)
      .required()
      .messages({
        'string.min': 'City must have between 5 and 25 characters',
        'string.max': 'City must have between 5 and 25 characters',
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
  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
  validateCreate,
};
