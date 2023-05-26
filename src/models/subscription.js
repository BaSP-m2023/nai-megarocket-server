const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  classes: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
