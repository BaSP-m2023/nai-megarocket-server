const express = require('express');

const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');

const router = express.Router();

router
  .get('/', subscriptionControllers.getAllSubscriptions)
  .get('/:id', subscriptionControllers.getSubscriptionById)
  .post('/', validateSubscription.validateCreation, subscriptionControllers.createSubscription);

module.exports = router;
