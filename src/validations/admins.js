const Joi = require('joi');

<<<<<<< HEAD
const validateCreate = (req, res, next) => {
=======
const validateUpdate = (req, res, next) => {
>>>>>>> master
  const adminValidation = Joi.object({
    firstName: Joi
      .string()
      .trim()
      .alphanum()
      .min(3)
      .max(25)
<<<<<<< HEAD
      .required()
=======
>>>>>>> master
      .messages({
        'string.base': 'first name must be a string',
        'string.min': 'first name too short',
        'string.max': 'the first name is invalid',
<<<<<<< HEAD
        'string.required': 'first name is required',
=======
>>>>>>> master
      }),
    lastName: Joi
      .string()
      .trim()
      .alphanum()
      .min(3)
      .max(25)
<<<<<<< HEAD
      .required()
=======
>>>>>>> master
      .messages({
        'string.base': 'last name mus be a string',
        'string.min': 'last name too short',
        'string.max': 'last name can be only 25 caracters long',
<<<<<<< HEAD
        'string.required': 'last name is required',
=======
>>>>>>> master
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
<<<<<<< HEAD
        'number.required': 'dni is required',
=======
>>>>>>> master
      }),
    phone: Joi
      .number()
      .integer()
<<<<<<< HEAD
      .required()
=======
>>>>>>> master
      .messages({
        'number.base': 'the phone number must be a number',
        'number.min': 'the phone number is invalid',
        'number.max': 'the phone number is invalid',
<<<<<<< HEAD
        'number.required': 'phone is required',
=======
>>>>>>> master
      }),
    email: Joi
      .string()
      .trim()
      .regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
<<<<<<< HEAD
      .required()
      .messages({
        'string.pattern.base': 'the email is invalid',
        'string.required': 'email is required',
=======
      .messages({
        'string.pattern.base': 'the email is invalid',
>>>>>>> master
      }),
    city: Joi
      .string()
      .trim()
      .alphanum()
      .min(5)
      .max(25)
<<<<<<< HEAD
      .required()
      .messages({
        'string.min': 'city is too short',
        'string.max': 'invalid city',
        'string.required': 'city is required',
=======
      .messages({
        'string.min': 'city is too short',
        'string.max': 'invalid city',
>>>>>>> master
      }),
    password: Joi
      .string()
      .trim()
      .min(8)
      .max(20)
      .regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/)
<<<<<<< HEAD
      .required()
=======
>>>>>>> master
      .messages({
        'string.empty': 'the password can not be empty',
        'string.min': 'the password is too short',
        'string.pattern.base': 'Password must contain at least 1 number, 1 uppercase letter, and 1 lowercase letter',
<<<<<<< HEAD
        'string.password': 'password is required',
=======
>>>>>>> master
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
<<<<<<< HEAD
  validateCreate,
=======
  validateUpdate,
>>>>>>> master
};
