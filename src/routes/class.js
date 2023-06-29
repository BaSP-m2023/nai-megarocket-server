const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .put('/:id', authMiddleware(['ADMIN']), validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', authMiddleware(['ADMIN']), classController.deleteClass)
  .get('/', authMiddleware(['ADMIN', 'TRAINER', 'MEMBER']), classController.getAllClasses)
  .get('/:id', authMiddleware(['ADMIN', 'TRAINER', 'MEMBER']), classController.getClassId)
  .post('/', authMiddleware(['ADMIN']), validations.validateCreation, classController.createClass);

module.exports = router;
