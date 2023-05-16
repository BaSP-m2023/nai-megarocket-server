const mongoose = require('mongoose');
const Class = require('../models/class');

const updateClass = (req, res) => {
  const { id } = req.params;
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  return Class.findOne({ day, hour, trainer })
    .then((repeatClass) => {
      if ((repeatClass && repeatClass._id.toString() !== id)) {
        return res.status(404).json({
          message: 'Class data already exists',
          error: false,
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
            return res.status(200).json({
              message: 'Class updated correctly',
              error: false,
              data: result,
            });
          }
          return res.status(404).json({
            message: `ID: ${id} not found`,
            error: false,
          });
        })
        .catch((error) => res.status(400).json(error));
    });
};

const deleteClass = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID does not exist',
      data: id,
      error: true,
    });
  }
  return Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with ID (${id}) was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(204).json({});
    })
    .catch((error) => res.status(500).json({
      message: 'error',
      data: undefined,
      error,
    }));
};

module.exports = {
  updateClass,
  deleteClass,
};
