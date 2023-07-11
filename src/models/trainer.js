const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainersSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
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
      type: Number,
      required: true,
      minLength: 7,
      maxLength: 9,
      unique: true,
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
      unique: true,
    },
    city: {
      type: String,
      minLength: 5,
      maxLength: 20,
      required: true,
    },
    salary: {
      type: Number,
      min: 10,
      max: 100,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Trainer', trainersSchema);
