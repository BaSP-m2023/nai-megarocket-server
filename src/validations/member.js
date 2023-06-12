const Joi = require('joi');

const validateMembersUpdate = (req, res, next) => {
  const membersUpdate = Joi.object({
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
    password: Joi.string().min(8).max(16).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
      .label('Password')
      .messages({
        'string.pattern.base': 'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
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
    birthDay: Joi.date().max(new Date(new Date()
      .setFullYear(new Date().getFullYear() - 16)).toISOString())
      .messages({
        'date.max': 'You must have at least 18 years',
        'any.required': 'Date cannot be empty',
      }),
    postalCode: Joi.number().integer().min(1000).max(99999)
      .messages({
        'number.max': 'Postal code cannot have more than 5 numbers',
        'number.min': 'Postal code cannot have less than 4 numbers',
        'any.required': 'Date cannot be empty',
      }),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('Black', 'Gold', 'Only Classes', 'Classic', 'Silver').messages({
      'string.valid': 'Please enter a valid membership: Black, Gold, Only Classes Classic, Silver',
      'number.min': 'Postal code cannot have less than 4 numbers',
      'any.required': 'Date cannot be empty',
    }),
  });

  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({
      message: 'The body cannot be empty',
      data: undefined,
      error: true,
    });
  }

  const validateMember = membersUpdate.validate(req.body);

  if (!validateMember.error) return next();
  return res.status(400).json({
    message: `${validateMember.error.details[0].message}`,
  });
};

const validateMembersCreation = (req, res, next) => {
  const membersValidation = Joi.object({
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
        'number.min': 'Phone must have exact 10 numbers',
      }),
    email: Joi
      .string()
      .trim()
      .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        'string.pattern.base': 'The email is invalid',
      }),
    password: Joi.string().min(8).max(16).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&*<>_?\-¿¡])/)
      .required()
      .messages({
        'string.pattern.base': 'Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number',
        'any.required': 'Password is required.',
        'string.empty': 'Password is required.',
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
    birthDay: Joi.date().max(new Date(new Date()
      .setFullYear(new Date().getFullYear() - 16)).toISOString())
      .required()
      .messages({
        'date.max': 'You must have at least 18 years',
        'any.required': 'Date cannot be empty',
      }),
    postalCode: Joi.number().integer().min(1000).max(99999)
      .required()
      .messages({
        'number.max': 'Postal code cannot have more than 5 numbers',
        'number.min': 'Postal code cannot have less than 4 numbers',
        'any.required': 'Date cannot be empty',
      }),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('Black', 'Gold', 'Only Classes', 'Classic', 'Silver')
      .required()
      .messages({
        'string.valid': 'Please enter a valid membership: Black, Gold, Only Classes Classic, Silver',
        'number.min': 'Postal code cannot have less than 4 numbers',
        'any.required': 'Date cannot be empty',
      }),
  });

  const validation = membersValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateMembersUpdate, validateMembersCreation };
