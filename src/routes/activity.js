const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');
const adminTrainerMemberMiddleware = require('../middlewares/adminTrainerMemberMiddleware').default;
const adminMiddleware = require('../middlewares/adminMiddleware').default;

const router = express.Router();

router
  .get('/', adminTrainerMemberMiddleware.verifyAdminTrainerMember, activitiesController.getAllActivities)
  .get('/:id', adminTrainerMemberMiddleware.verifyAdminTrainerMember, activitiesController.getActivitiesById)
  .post('/', adminMiddleware.verifyAdmin, validations.validateCreation, activitiesController.createActivities)
  .put('/:id', adminMiddleware.verifyAdmin, validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', adminMiddleware.verifyAdmin, activitiesController.deleteActivities);

module.exports = router;
