const Joi = require('joi');
const mongoose = require('mongoose');
const Trainer = require('../models/trainer');

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    dni: Joi.string().min(7).max(9),
    phone: Joi.string().length(10),
    email: Joi.string().email().min(8).max(25),
    city: Joi.string().min(5).max(20),
    password: Joi.string().min(4).max(25),
    salary: Joi.number(),
    is_active: Joi.boolean(),
  });

  const validation = trainerValidation.validate(req.body);
  const newTrainer = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  Trainer.findById(id)
    .then((actualTrainer) => {
      if ((!newTrainer.name || actualTrainer.name === newTrainer.name)
      && (!newTrainer.description || newTrainer.description === actualTrainer.description)
      && (!newTrainer.isActive || newTrainer.isActive === actualTrainer.isActive)) {
        return res.status(400).json({
          message: 'No changes have been made to the data',
          data: [actualTrainer.isActive, newTrainer.isActive],
          error: true,
        });
      } if (validation.error) {
        return res.status(400).json({
          message: `There was an error: ${validation.error}`,
          data: undefined,
          error: true,
        });
      }
      return next();
    })

    .catch((error) => res.status(500).json({ message: 'An error occurred', error }));
};

module.exports = { validateUpdate };
