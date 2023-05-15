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
    data: undefined,
    error: true,
  });
};

module.exports = { validateMembersUpdate };
