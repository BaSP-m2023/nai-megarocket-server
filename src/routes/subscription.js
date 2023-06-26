const express = require('express');
const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['ADMIN']), subscriptionControllers.getAllSubscriptions)
  .get('/:id', verifyToken(['ADMIN', 'MEMBER']), subscriptionControllers.getSubscriptionById)
  .post('/', verifyToken(['ADMIN', 'MEMBER']), validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', verifyToken(['ADMIN']), validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', verifyToken(['ADMIN', 'MEMBER']), subscriptionControllers.deleteSubscription);

module.exports = router;
