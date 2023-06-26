const express = require('express');

const subscriptionControllers = require('../controllers/subscription');
const validateSubscription = require('../validations/subscription');
const adminMiddleware = require('../middlewares/adminMiddleware').default;
const adminMemberMiddleware = require('../middlewares/adminMemberMiddleware').default;

const router = express.Router();

router
  .get('/', adminMemberMiddleware.verifyAdminMember, subscriptionControllers.getAllSubscriptions)
  .get('/:id', adminMiddleware.verifyAdmin, subscriptionControllers.getSubscriptionById)
  .post('/', adminMemberMiddleware.verifyAdminMember, validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', adminMiddleware.verifyAdmin, validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', adminMemberMiddleware.verifyAdminMember, subscriptionControllers.deleteSubscription);

module.exports = router;
