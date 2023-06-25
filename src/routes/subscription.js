const express = require('express');
const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), subscriptionControllers.getAllSubscriptions)
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), subscriptionControllers.getSubscriptionById)
  .post('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), subscriptionControllers.deleteSubscription);

module.exports = router;
