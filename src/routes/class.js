const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['ADMIN', 'TRAINER', 'MEMBER']), classController.getAllClasses)
  .get('/:id', verifyToken(['ADMIN', 'TRAINER', 'MEMBER']), classController.getClassId)
  .post('/', verifyToken(['ADMIN']), validations.validateCreation, classController.createClass)
  .put('/:id', verifyToken(['ADMIN']), validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', verifyToken(['ADMIN']), classController.deleteClass);

module.exports = router;
