const Joi = require('joi');

const validateAdminCreate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi
      .string()
      .trim()
      .alphanum()
      .min(4)
      .max(10)
      .messages({
        'string.base': 'first name must be a string',
        'string.min': 'first name too short',
        'string.max': 'the first name is invalid',
      }),
    lastName: Joi
      .string()
      .trim()
      .alphanum()
      .min(5)
      .max(25)
      .messages({
        'string.base': 'last name mus be a string',
        'string.min': 'last name too short',
        'string.max': 'last name can be only 25 caracters long',
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
      }),
    phone: Joi
      .number()
      .integer()
      .min(10)
      .max(10)
      .messages({
        'number.base': 'the phone number must be a number',
        'number.min': 'the phone number is invalid',
        'number.max': 'the phone number is invalid',
      }),
    email: Joi
      .string()
      .trim()
      .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'the email is invalid',
      }),
    city: Joi
      .string()
      .trim()
      .alphanum()
      .min(5)
      .max(25)
      .messages({
        'string.min': 'city is too short',
        'string.max': 'invalid city',
      }),
    password: Joi
      .string()
      .trim()
      .min(4)
      .messages({
        'string.empty': 'the password can not be empty',
        'string.min': 'the password is too short',
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
  validateAdminCreate,
};
