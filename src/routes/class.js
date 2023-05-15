const express = require('express');
const classController = require('../controllers/class');
const validationsClass = require('../validations/class');

const router = express.Router();

router
  .put('/:id', validationsClass.validationUpdateClass, classController.updateClass)
  .delete('/:id', classController.deleteClass);
module.exports = router;
