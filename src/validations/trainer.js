const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    dni: Joi.number().integer().min(100000).max(999999999)
      .required(),
    phone: Joi.number().integer().min(1000000000).max(9999999999)
      .required(),
    email: Joi.string().email().min(8).max(25)
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .required(),
    city: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(4).max(25).required(),
    salary: Joi.number().required(),
    is_active: Joi.boolean(),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
};
