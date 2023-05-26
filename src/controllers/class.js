const mongoose = require('mongoose');
const Class = require('../models/class');

const updateClass = async (req, res) => {
  const { id } = req.params;
  const {
    day,
    hour,
    trainer,
    activity,
    slots,
  } = req.body;

  return Class.findOne({ day, hour, trainer })
    .then((repeatClass) => {
      if (repeatClass) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < repeatClass.day.length; i++) {
          if (day.includes(repeatClass.day[i])) {
            return res.status(400).json({
              message: 'Trainer has another class scheduled.',
              error: true,
            });
          }
        }
      }
      // eslint-disable-next-line
      if ((repeatClass && repeatClass._id.toString() !== id)) {
        return res.status(404).json({
          message: 'Class data already exists',
          error: true,
        });
      }
      return Class.findByIdAndUpdate(
        id,
        {
          day,
          hour,
          trainer,
          activity,
          slots,
        },
        { new: true },
      )
        .then((result) => {
          if (!result) {
            res.status(404).json({
              message: `ID: ${id} not found`,
              error: true,
            });
          } else {
            res.status(200).json({
              message: 'Class updated correctly',
              error: false,
              data: result,
            });
          }
        })
        .catch((error) => res.status(400).json(error));
    });
};

const deleteClass = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }
  return Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Class with ID (${id}) was not found`,
          data: undefined,
          error: true,
        });
      } else {
        res.status(200).json({
          message: 'Class deleted',
          data: result,
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const getAllClasses = (req, res) => {
  Class.find()
    .populate('trainer')
    .populate('activity')
    .then((classes) => {
      if (classes.length > 0) {
        res.status(200).json({
          message: 'Complete list of classes.',
          data: classes,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'List of classes empty.',
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'Cannot get all classes, an error has occurred',
      error,
    }));
};

const getClassId = (req, res) => {
  const { id } = req.params;
  Class.findById(id)
    .populate('trainer')
    .populate('activity')
    .then((classes) => {
      if (classes) {
        res.status(200).json({
          message: `Class ${classes.id} obtained.`,
          data: classes,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found.',
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'Cannot get the class',
      error,
    }));
};

const createClass = (req, res) => {
  const {
    day,
    hour,
    trainer,
    activity,
    slots,
  } = req.body;

  if (!day || !hour || !trainer) {
    return res.status(400).json({
      message: 'Missing required fields.',
      error: true,
    });
  }

  return Class.findOne({ hour, trainer })
    .then((existingClass) => {
      if (existingClass) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < existingClass.day.length; i++) {
          if (day.includes(existingClass.day[i])) {
            return res.status(400).json({
              message: 'Trainer has another class scheduled.',
              error: true,
            });
          }
        }
      }
      return Class.create({
        day,
        hour,
        trainer,
        activity,
        slots,
      })
        .then((createdClass) => res.status(201).json({
          message: 'Class created.',
          data: createdClass,
          error: false,
        }))
        .catch((error) => res.status(500).json({
          message: 'Cannot create class, unexpected error',
          error,
        }));
    })
    .catch((error) => res.status(500).json({
      message: 'Cannot check class existence, unexpected error',
      error,
    }));
};

module.exports = {
  getAllClasses,
  getClassId,
  createClass,
  updateClass,
  deleteClass,
};
