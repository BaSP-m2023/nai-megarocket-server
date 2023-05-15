const express = require('express');
const subscriptionController = require('../controllers/subscription');
const subscriptionValidation = require('../validations/subscription');

const router = express.Router();

router
  .put('/:id?', subscriptionValidation.validateUpdate, subscriptionController.updateSubscription)
  .delete('/:id?', subscriptionController.deleteSubscription);

module.exports = router;
