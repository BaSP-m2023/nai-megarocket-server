const Joi = require('joi');

const validate = (req, res, next) => {
  const superAdminsValidation = Joi.object({
    firstName: Joi.string().min(3).max(25),
    email: Joi.string().email().min(8).max(25),
    password: Joi.string().min(8).max(16).alphanum(),
  });

  const validation = superAdminsValidation.validate({ ...req.body });
  if (Object.entries(req.body).length === 0) {
    validation.error = true;
    return res.status(400).json({
      message: 'The request body cannot be empty',
      data: undefined,
      error: true,
    });
  }
  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validate,
};
