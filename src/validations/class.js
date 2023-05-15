const Joi = require('joi');

const validationUpdateClass = (req, res, next) => {
  const classUpdate = Joi.object({
    id: Joi.Number(),
    class: Joi.String(),
    trainer: Joi.String(),
    room: Joi.String(),
    durationHours: Joi.Number(),
    hour: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required(),
  });

  const validationsClass = classUpdate.validate(req.body);
  if (!validationsClass.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validationsClass.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validationUpdateClass,
};
