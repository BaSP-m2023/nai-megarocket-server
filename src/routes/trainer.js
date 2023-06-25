const express = require('express');
const trainersController = require('../controllers/trainer');
const validations = require('../validations/trainer');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), trainersController.getAllTrainers)
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), trainersController.getTrainerById)
  .post('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateCreation, trainersController.createTrainer)
  .put('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), trainersController.deleteTrainers);

module.exports = router;
