const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classController.getAllClasses)
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classController.getClassId)
  .post('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateCreation, classController.createClass)
  .put('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classController.deleteClass);

module.exports = router;
