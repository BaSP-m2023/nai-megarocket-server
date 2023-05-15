const Joi = require('joi');

const validateClass = (req, res, next) => {
  const validationClass = Joi.object({
    id: Joi.Number(),
    class: Joi.String(),
    trainer: Joi.String(),
    room: Joi.String(),
    durationHours: Joi.Number(),
    hour: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required(),
  });

  const validation = validationClass.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateClass,
};
