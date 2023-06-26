const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN']), adminsController.getAllAdmins)
  .get('/:id', verifyToken(['SUPER_ADMIN']), adminsController.getAdminById)
  .post('/', verifyToken(['SUPER_ADMIN']), validations.validateCreate, adminsController.createAdmin)
  .put('/:id', verifyToken(['SUPER_ADMIN']), validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', verifyToken(['SUPER_ADMIN']), adminsController.deleteAdmin);

module.exports = router;
