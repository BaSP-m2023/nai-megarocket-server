const express = require('express');

const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');

const router = express.Router();

router
  .get('/', subscriptionControllers.getAllSubscriptions)
  .get('/:id', subscriptionControllers.getSubscriptionById)
  .post('/', validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', subscriptionControllers.deleteSubscription);

module.exports = router;
