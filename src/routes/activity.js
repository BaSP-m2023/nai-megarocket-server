const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['ADMIN', 'MEMBER']), activitiesController.getAllActivities)
  .get('/:id', verifyToken(['ADMIN', 'MEMBER']), activitiesController.getActivitiesById)
  .post('/', verifyToken(['ADMIN']), validations.validateCreation, activitiesController.createActivities)
  .put('/:id', verifyToken(['ADMIN']), validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', verifyToken(['ADMIN']), activitiesController.deleteActivities);

module.exports = router;
