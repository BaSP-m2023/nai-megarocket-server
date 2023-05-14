const Joi = require('joi');

const validateMembersUpdate = (req, res, next) => {
  const membersUpdate = Joi.object({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    dni: Joi.number().min(1000000).max(99999999).required(),
    phone: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    city: Joi.string().min(8).max(25).required(),
    birthDay: Joi.date().required(),
    postalCode: Joi.number().min(1000).max(99999).required(),
    isActive: Joi.boolean().required(),
    membership: Joi.string().required(),
  });

  const validateMember = membersUpdate.validate(req.body);

  if (!validateMember.error) return next;
  return res.status(400).json({
    message: `Error: ${validateMember.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateMembersUpdate };
