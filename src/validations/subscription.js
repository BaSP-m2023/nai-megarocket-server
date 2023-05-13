const Joi = require('joi');

const validate = (req, res, next) => {
  const { id } = req.params;
  const subscriptionValidation = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    classes: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    member: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: Joi.date().max(Date.now()).min('1923-01-01'),
  });

  const validation = subscriptionValidation.validate({ id, ...req.body });

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validate,
};
