const mongoose = require('mongoose');
const Class = require('../models/class');

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

    const repeatClass = await Class.findOne({
      hour, trainer, _id: { $ne: id },
    });

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

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer').populate('activity');
    if (classes) {
      res.status(200).json({
        message: 'Classes list',
        data: classes,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'There are no classes',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Cannot get all classes, an error has occurred',
      data: undefined,
      error: true,
    });
  }
};

const getClassId = (req, res) => {
  const { id } = req.params;
  Class.findById(id)
    .populate('trainer')
    .populate('activity')
    .then((classes) => {
      if (classes) {
        res.status(200).json({
          message: 'Class obtained.',
          data: classes,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class was not found',
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
          message: 'Class was succesfully created.',
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
