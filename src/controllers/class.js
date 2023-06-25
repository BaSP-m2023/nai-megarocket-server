const mongoose = require('mongoose');
const Class = require('../models/class');

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer').populate('activity');
    if (classes.length > 0) {
      return res.status(200).json({
        message: 'Classes list',
        data: classes,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'There are no classes',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot get all classes, an error has occurred',
      data: undefined,
      error: true,
    });
  }
};

const getClassId = async (req, res) => {
  try {
    const { id } = req.params;
    const classes = await Class.findById(id)
      .populate('trainer')
      .populate('activity');

    if (classes) {
      return res.status(200).json({
        message: 'Class was found',
        data: classes,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Class was not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot get the class',
      data: undefined,
      error,
    });
  }
};

const createClass = async (req, res) => {
  try {
    const {
      day,
      hour,
      trainer,
      activity,
      slots,
    } = req.body;

    const sameHourClass = await Class.findOne({ hour });

    if (sameHourClass && sameHourClass.day.some((sameDay) => day.includes(sameDay))) {
      return res.status(400).json({
        message: `There is already a class in this day at ${sameHourClass.hour}.`,
        data: undefined,
        error: true,
      });
    }

    const sameTrainerClass = await Class.findOne({ hour, trainer });

    if (sameTrainerClass?.day.some((sameDay) => day.includes(sameDay))) {
      return res.status(400).json({
        message: 'Trainer has another class scheduled.',
        data: undefined,
        error: true,
      });
    }

    const createdClass = await Class.create({
      day,
      hour,
      trainer,
      activity,
      slots,
    });

    return res.status(201).json({
      message: 'Class was successfully created.',
      data: createdClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot create class, an unexpected error occurred',
      error,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      day, hour, trainer, activity, slots,
    } = req.body;

    const classToUpdate = await Class.findById(id);

    if (!classToUpdate) {
      return res.status(404).json({
        message: 'Class was not found.',
        data: undefined,
        error: true,
      });
    }

    const sameClass = await Class.findOne({
      day, hour, trainer, activity, slots,
    });

    if (sameClass) {
      return res.status(400).json({
        message: 'There is nothing to change',
        data: undefined,
        error: true,
      });
    }

    const sameHourClass = await Class.findOne({
      hour, _id: { $ne: id },
    });

    if (sameHourClass && sameHourClass.day.some((sameDay) => day.includes(sameDay))) {
      return res.status(400).json({
        message: `There is already a class in this day at ${sameHourClass.hour}.`,
        data: undefined,
        error: true,
      });
    }

    const sameTrainerClass = await Class.findOne({
      hour, trainer, _id: { $ne: id },
    });

    if (sameTrainerClass?.day.some((sameDay) => day.includes(sameDay))) {
      return res.status(400).json({
        message: 'Trainer has another class scheduled.',
        data: undefined,
        error: true,
      });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      {
        day, hour, trainer, activity, slots,
      },
      { new: true },
    );

    return res.status(200).json({
      message: 'Class was succesfully updated',
      error: false,
      data: updatedClass,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }

  try {
    const result = await Class.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Class was not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Class wass succesfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllClasses,
  getClassId,
  createClass,
  updateClass,
  deleteClass,
};
