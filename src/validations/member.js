const Joi = require('joi');

const validateMembersUpdate = (req, res, next) => {
  const membersUpdate = Joi.object({
    firstName: Joi.string().min(3).max(25),
    lastName: Joi.string().min(3).max(25),
    dni: Joi.number().min(1000000).max(99999999),
    phone: Joi.number(),
    email: Joi.string(),
    password: Joi.string().min(8),
    city: Joi.string().min(4).max(25),
    birthDay: Joi.date(),
    postalCode: Joi.number().min(1000).max(99999),
    isActive: Joi.boolean(),
    membership: Joi.string(),
  });

  const validateMember = membersUpdate.validate(req.body);

  if (!validateMember.error) return next();
  return res.status(400).json({
    message: `Error: ${validateMember.error.details[0].message}`,
  });
};
const validateMembersCreation = (req, res, next) => {
  const membersValidation = Joi.object({
    firstName: Joi.string().min(3).max(25).required()
      .label('First Name'),
    lastName: Joi.string().min(3).max(25).required()
      .label('Last Name'),
    dni: Joi.number().integer().min(1000000).max(99999999)
      .label('D.N.I')
      .required(),
    phone: Joi.number().integer().label('Phone')
      .required(),
    email: Joi.string().min(8).max(25).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/)
      .label('Email')
      .required(),
    password: Joi.string().min(8).max(20).regex(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/)
      .label('Password')
      .required()
      .messages({
        'string.pattern.base': 'Password must have at least 1 number, 1 uppercase letter, and 1 lowercase letter',
      }),
    city: Joi.string().min(4).max(25).label('City')
      .required(),
    birthDay: Joi.date().iso().max(new Date().toISOString()).label('Birth Day')
      .required(),
    postalCode: Joi.number().integer().min(1000).max(99999)
      .label('Postal Code')
      .required(),
    isActive: Joi.boolean().label('Is active').required(),
    membership: Joi.string().label('Membership').required(),
  });

  const validation = membersValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateMembersUpdate, validateMembersCreation };
