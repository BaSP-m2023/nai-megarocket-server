const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 250,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
