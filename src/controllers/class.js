const Class = require('../models/class');

const getAllClasses = (req, res) => {
  Class.find()
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

// eslint-disable-next-line consistent-return
const createClass = (req, res) => {
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  if (day && hour && trainer && Class.exists({ day, hour, trainer })) {
    return res.status(400).json({
      message: 'Trainer has another class scheduled at that time.',
      error: true,
    });
  }

  Class.create({
    day,
    hour,
    trainer,
    activity,
    slots,
  })
    .then((classes) => res.status(201).json({
      message: 'Class created.',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'Cannot create class, unexpected error',
      error,
    }));
};

module.exports = { getAllClasses, getClassId, createClass };
