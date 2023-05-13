const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    day: {
      type: Date,
      require: true,
    },
    hour: {
      type: Date,
      require: true,
    },
    trainer: {
      type: String,
      require: true,
    },
    activity: {
      type: String,
      require: true,
    },
    slots: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Class', classSchema);
