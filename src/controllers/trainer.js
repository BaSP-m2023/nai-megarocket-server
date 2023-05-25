const mongoose = require('mongoose');
const Trainer = require('../models/trainer');

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => {
      if (trainers.length === 0) {
        return res.status(404).json({
          message: 'There is no trainers',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Complete trainers list',
        data: trainers,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Invalid trainer id: ${id}`,
      error: true,
    });
  }
  return Trainer.findById(id)
    .then((trainer) => {
      if (trainer == null) {
        return res.status(404).json({
          message: `There are no trainer with id: ${id}`,
          data: trainer,
          error: false,
        });
      }
      return res.status(200).json({
        message: `Trainer with id: ${id}`,
        data: trainer,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const createTrainer = async (req, res) => {
  const existingTrainerDni = await Trainer.findOne({ dni: req.body.dni });
  const existingTrainerEmail = await Trainer.findOne({ email: req.body.email });
  if (existingTrainerDni) {
    return res.status(409).json({
      message: 'Trainer with that DNI already exists',
      error: true,
    });
  }
  if (existingTrainerEmail) {
    return res.status(409).json({
      message: 'Trainer with that Email already exists',
      error: true,
    });
  }
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
    salary,
    isActive,
  } = req.body;
  return Trainer.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
    salary,
    isActive,
  })
    .then((result) => res.status(201).json({
      message: 'New trainer added correctly',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const updateTrainers = (req, res) => {
  const { id } = req.params;
  Trainer.findOne({ $or: [{ dni: req.body.dni }, { email: req.body.email }] })
    .then((repeated) => {
      if (repeated && Object.values(repeated.toObject())[0].toString() !== id) {
        return res.status(400).json({
          message: 'Email or Dni already exists',
          error: true,
        });
      }
      const {
        firstName, lastName, dni, phone, email, city, password, salary, isActive,
      } = req.body;
      return Trainer.findByIdAndUpdate(
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
          if (!trainer) {
            return res.status(404).json({
              message: `There is no trainer with id:${id}`,
              data: undefined,
              error: true,
            });
          }
          return res.status(200).json({
            message: 'Trainer updated correctly',
            data: trainer,
            error: false,
          });
        });
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred', error,
    }));
};

const deleteTrainers = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  return Trainer.findByIdAndDelete(id)
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: `There is no trainer with id ${id}`,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Trainer deleted',
        data: trainer,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred', error,
    }));
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainers,
  deleteTrainers,
};
