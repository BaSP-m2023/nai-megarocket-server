const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    day: {
      type: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      }],
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Trainer',
      required: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    slots: {
      type: Number,
      required: true,
      min: 5,
      max: 15,
    },
    subscriptions: [{
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Class', classSchema);
