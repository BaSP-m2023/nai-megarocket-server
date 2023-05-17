const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    day: {
      type: Date,
      require: true,
    },
    hour: {
      type: String,
      require: true,
    },
    trainer: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 20,
    },
    activity: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 20,
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
