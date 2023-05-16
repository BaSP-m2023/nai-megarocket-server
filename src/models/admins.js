const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
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
      lowercase: true,
      match: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
      required: true,
    },
    city: {
      type: String,
      minLength: 5,
      maxLength: 25,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 20,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Admin', adminSchema);
