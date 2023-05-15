const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');

const router = express.Router();

router
  .put('/:id', validations.validationClass, classController.updateclass)
  .delete('/:id', classController.deleteclass);
module.exports = router;
