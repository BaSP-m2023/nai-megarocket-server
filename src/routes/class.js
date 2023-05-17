const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');

const router = express.Router();

router
  .put('/:id', validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', classController.deleteClass)
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassId)
  .post('/', validations.validateCreation, classController.createClass);

module.exports = router;
