const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.date().min('now').required(),
    hour: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required(),
    activity: Joi.string().min(3).max(50).required(),
    trainer: Joi.string().min(3).max(50).required(),
    slots: Joi.number().min(0).max(50).required(),
  });

  const validation = classValidation.validate(req.body);

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
