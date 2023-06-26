const express = require('express');
const trainersController = require('../controllers/trainer');
const validations = require('../validations/trainer');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['ADMIN', 'TRAINER']), trainersController.getAllTrainers)
  .get('/:id', verifyToken(['ADMIN', 'TRAINER']), trainersController.getTrainerById)
  .post('/', verifyToken(['ADMIN']), validations.validateCreation, trainersController.createTrainer)
  .put('/:id', verifyToken(['ADMIN', 'TRAINER']), validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', verifyToken(['ADMIN']), trainersController.deleteTrainers);

module.exports = router;
