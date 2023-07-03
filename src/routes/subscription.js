const express = require('express');

const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/', authMiddleware(['ADMIN', 'MEMBER', 'TRAINER']), subscriptionControllers.getAllSubscriptions)
  .get('/:id', authMiddleware(['ADMIN', 'MEMBER']), subscriptionControllers.getSubscriptionById)
  .post('/', authMiddleware(['ADMIN', 'MEMBER']), validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', authMiddleware(['ADMIN']), validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', authMiddleware(['ADMIN', 'MEMBER']), subscriptionControllers.deleteSubscription);

module.exports = router;
