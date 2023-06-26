const mongoose = require('mongoose');
const firebaseApp = require('../helper/firebase/index').default;
const Trainer = require('../models/trainer');

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (trainers.length === 0) {
      return res.status(404).json({
        message: 'Trainers not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred', error });
  }
};

const getTrainerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid format id',
      error: true,
    });
  }
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({
        message: 'Trainer was not found',
        data: undefined,
        error: false,
      });
    }
    return res.status(200).json({
      message: `Trainer with id: ${id}`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred', error });
  }
};

const createTrainer = async (req, res) => {
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
  let firebaseUid;

  try {
    const existingTrainerDni = await Trainer.findOne({ dni });
    const existingTrainerEmail = await Trainer.findOne({ email });
    if (existingTrainerDni || existingTrainerEmail) {
      return res.status(400).json({
        message: 'This trainer already exists.',
        data: undefined,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email,
      password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'TRAINER' });
    const addTrainer = await Trainer.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      salary,
      isActive,
    });
    return res.status(201).json({
      message: 'Trainer was successfully created',
      data: addTrainer,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred', data: undefined, error });
  }
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
      password,
      city,
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

    const trainerToUpdate = await Trainer.findById(id);

    await firebaseApp.auth().updateUser(trainerToUpdate.firebaseUid, {
      password,
      email,
    });

    const trainerUpdated = await Trainer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        salary,
        isActive,
      },
      { new: true },
    );

    if (!trainerUpdated) {
      return res.status(404).json({
        message: `There is no trainer with id:${id}`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Trainer updated correctly',
      data: trainerUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString(),
      error,
    });
  }
};

const deleteTrainers = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid id format',
      error: true,
    });
  }
  try {
    const trainerToDelete = await Trainer.findById(id);
    if (!trainerToDelete) {
      return res.status(404).json({
        message: `There is no trainer with id ${id}`,
        data: undefined,
        error: true,
      });
    }
    await Trainer.deleteOne(trainerToDelete);
    await firebaseApp.auth().deleteUser(trainerToDelete.firebaseUid);
    return res.status(200).json({
      message: 'Trainer deleted',
      data: trainerToDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString(),
      data: undefined,
      error,
    });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainers,
  deleteTrainers,
};
