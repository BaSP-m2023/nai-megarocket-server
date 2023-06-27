const express = require('express');
const trainersController = require('../controllers/trainer');
const validations = require('../validations/trainer');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/', authMiddleware(['ADMIN']), trainersController.getAllTrainers)
  .get('/:id', authMiddleware(['ADMIN', 'TRAINER']), trainersController.getTrainerById)
  .post('/', authMiddleware(['ADMIN']), validations.validateCreation, trainersController.createTrainer)
  .put('/:id', authMiddleware(['ADMIN', 'TRAINER']), validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', authMiddleware(['ADMIN']), trainersController.deleteTrainers);

module.exports = router;
