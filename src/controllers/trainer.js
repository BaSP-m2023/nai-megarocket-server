const mongoose = require('mongoose');
const Trainer = require('../models/trainer');

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => {
      if (trainers.length === 0) {
        return res.status(404).json({
          message: 'Trainers not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Trainers list',
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
          message: 'Trainer was not found',
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
  if (existingTrainerDni || existingTrainerEmail) {
    return res.status(400).json({
      message: 'This trainer already exists.',
      data: undefined,
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
      message: 'Trainer was succesfully created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const updateTrainers = async (req, res) => {
  try {
    const { id } = req.params;
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id format',
        error: true,
      });
    }

    const findTrainer = await Trainer.findById(id);

    if (!findTrainer) {
      return res.status(404).json({
        message: 'Trainer was not found',
        data: undefined,
        error: true,
      });
    }

    const sameTrainer = await Trainer.findOne({
      $and: [
        { firstName: { $eq: firstName } },
        { lastName: { $eq: lastName } },
        { dni: { $eq: dni } },
        { phone: { $eq: phone } },
        { email: { $eq: email } },
        { city: { $eq: city } },
        { password: { $eq: password } },
        { salary: { $eq: salary } },
        { isActive: { $eq: isActive } },
      ],
    });

    if (sameTrainer) {
      return res.status(400).json({
        message: 'There is nothing to change',
        data: undefined,
        error: true,
      });
    }

    const existingTrainer = await Trainer.findOne({
      $and: [
        {
          $or: [{ dni }, { email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });

    if (existingTrainer) {
      return res.status(400).json({
        message: 'This trainer already exists.',
        data: undefined,
        error: true,
      });
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
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
    );

    if (!updatedTrainer) {
      return res.status(404).json({
        message: `There is no trainer with id:${id}`,
        data: undefined,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Trainer updated correctly',
      success: true,
      data: updatedTrainer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
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
        error: false,
        data: trainer,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred',
      error,
    }));
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainers,
  deleteTrainers,
};
