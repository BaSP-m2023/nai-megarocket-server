const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  day: {
    type: Date,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },

});
module.exports = mongoose.model('Class', classSchema);
