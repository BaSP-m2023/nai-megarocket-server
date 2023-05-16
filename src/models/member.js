const mongoose = require('mongoose');

const { Schema } = mongoose;

const membersSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  dni: {
    type: Number,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
  phone: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    minLength: 8,
    maxLength: 25,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 20,
    required: true,
  },
  city: {
    type: String,
    minLength: 4,
    maxLength: 25,
    required: true,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  postalCode: {
    type: Number,
    minLength: 4,
    maxLength: 5,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  membership: {
    type: String,
    required: true,
    enum: ['Black', 'Classic', 'Only Classes'],
  },
});

module.exports = mongoose.model('Member', membersSchema);
