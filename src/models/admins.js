const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dni: {
    type: Number,
    required: true,
    min: 10000000,
    max: 99999999,
  },
  phone: {
    type: Number,
    required : true,
    min: 10,
    max: 10,

  },
  email: {
    type: String,
    required: true,
    lowecase: true,
    match: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$,
  },
  city: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 25,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('admin', adminSchema);
