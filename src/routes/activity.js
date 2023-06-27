const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/', authMiddleware(['ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getAllActivities)
  .get('/:id', authMiddleware(['ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getActivitiesById)
  .post('/', authMiddleware(['ADMIN']), activitiesController.createActivities)
  .put('/:id', authMiddleware(['ADMIN']), validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', authMiddleware(['ADMIN']), activitiesController.deleteActivities);

module.exports = router;
