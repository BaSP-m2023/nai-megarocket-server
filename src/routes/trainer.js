const express = require('express');
const trainersController = require('../controllers/trainer');
const validations = require('../validations/trainer');
const adminTrainerMiddleware = require('../middlewares/adminTrainerMiddleware').default;
const adminMiddleware = require('../middlewares/adminMiddleware').default;

const router = express.Router();

router
  .get('/', adminMiddleware.verifyAdmin, trainersController.getAllTrainers)
  .get('/:id', adminTrainerMiddleware.verifyAdminTrainer, trainersController.getTrainerById)
  .post('/', adminMiddleware.verifyAdmin, validations.validateCreation, trainersController.createTrainer)
  .put('/:id', adminTrainerMiddleware.verifyAdminTrainer, validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', adminMiddleware.verifyAdmin, trainersController.deleteTrainers);

module.exports = router;
