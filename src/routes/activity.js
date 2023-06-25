const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getAllActivities)
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getActivitiesById)
  .post('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateCreation, activitiesController.createActivities)
  .put('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activitiesController.deleteActivities);

module.exports = router;
