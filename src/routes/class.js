const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');
const adminMiddleware = require('../middlewares/adminMiddleware').default;
const adminTrainerMemberMiddleware = require('../middlewares/adminTrainerMemberMiddleware').default;

const router = express.Router();

router
  .put('/:id', adminMiddleware.verifyAdmin, validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', adminMiddleware.verifyAdmin, classController.deleteClass)
  .get('/', adminTrainerMemberMiddleware.verifyAdminTrainerMember, classController.getAllClasses)
  .get('/:id', adminTrainerMemberMiddleware.verifyAdminTrainerMember, classController.getClassId)
  .post('/', adminMiddleware.verifyAdmin, validations.validateCreation, classController.createClass);

module.exports = router;
