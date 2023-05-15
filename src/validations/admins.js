const Joi = require('joi');

const validateAdminCreate =(req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lasName: Joi.string().min(3).max(30).required(),
    email:
    password:
  })
}
