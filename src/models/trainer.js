const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainersSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 9,
    unique: true,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    minLength: 8,
    maxLength: 20,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
  },
  password: {
    type: String,
    minLength: 4,
    maxLength: 25,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Trainers', trainersSchema);
