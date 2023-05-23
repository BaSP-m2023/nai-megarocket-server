const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    day: {
      type: String,
      require: true,
    },
    hour: {
      type: String,
      require: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Trainers',
      require: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
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
