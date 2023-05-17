const express = require('express');
const trainersController = require('../controllers/trainer');
const validations = require('../validations/trainer');

const router = express.Router();

router
  .get('/', trainersController.getAllTrainers)
  .get('/:id', trainersController.getTrainerById)
  .post('/', validations.validateCreation, trainersController.createTrainer)
  .put('/:id', validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', trainersController.deleteTrainers);

module.exports = router;
