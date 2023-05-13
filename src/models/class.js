const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  day: Date,
  hour: Date,
  trainer: String,
  activity: String,
  slots: Number,
});

module.exports = mongoose.model('Class', classSchema);
