const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');

const router = express.Router();

router
  .get('/', activitiesController.getAllActivities)
  .get('/:id', activitiesController.getActivitiesById)
  .post('/', validations.validateCreation, activitiesController.createActivities)
  .put('/:id', validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', activitiesController.deleteActivities);

module.exports = router;
