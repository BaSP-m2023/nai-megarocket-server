const Joi = require('joi');

const validateCreate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi
      .string()
      .trim()
      .alphanum()
      .min(3)
      .max(25)
      .required()
      .messages({
        'string.base': 'first name must be a string',
        'string.min': 'first name too short',
        'string.max': 'the first name is invalid',
        'string.required': 'first name is required',
      }),
    lastName: Joi
      .string()
      .trim()
      .alphanum()
      .min(3)
      .max(25)
      .required()
      .messages({
        'string.base': 'last name mus be a string',
        'string.min': 'last name too short',
        'string.max': 'last name can be only 25 caracters long',
        'string.required': 'last name is required',
      }),
    dni: Joi
      .number()
      .integer()
      .min(10000000)
      .max(99999999)
      .messages({
        'number.base': 'the DNI must be a number',
        'number.min': 'invalid DNI',
        'number.max': 'invalid DNI',
        'number.required': 'dni is required',
      }),
    phone: Joi
      .number()
      .integer()
      .required()
      .messages({
        'number.base': 'the phone number must be a number',
        'number.min': 'the phone number is invalid',
        'number.max': 'the phone number is invalid',
        'number.required': 'phone is required',
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
      .alphanum()
      .min(5)
      .max(25)
      .required()
      .messages({
        'string.min': 'city is too short',
        'string.max': 'invalid city',
        'string.required': 'city is required',
      }),
    password: Joi
      .string()
      .trim()
      .min(8)
      .max(20)
      .regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/)
      .required()
      .messages({
        'string.empty': 'the password can not be empty',
        'string.min': 'the password is too short',
        'string.pattern.base': 'Password must contain at least 1 number, 1 uppercase letter, and 1 lowercase letter',
        'string.password': 'password is required',
      }),
  });
  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreate,
};
