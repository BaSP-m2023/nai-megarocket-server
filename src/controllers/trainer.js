const mongoose = require('mongoose');
const Trainer = require('../models/trainer');

const updateTrainers = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;
  Trainer.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary,
      isActive,
    },
    { new: true },
  )
    .then((trainer) => {
      if (trainer !== null) {
        res.status(200).json({
          message: 'Trainer updated correctly',
          data: trainer,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `There is no trainer with id:${id}`,
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred', error,
    }));
};

const deleteTrainers = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  Trainer.findByIdAndDelete(id)
    .then((trainer) => {
      if (trainer !== null) {
        res.status(200).json({
          message: 'Trainer deleted',
          error: false,
        });
      } else {
        res.status(404).json({
          message: `There is no trainer with id:${id}`,
          error: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred', error,
      });
    });
};

module.exports = {
  updateTrainers,
  deleteTrainers,
};
