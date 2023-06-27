const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/', authMiddleware(['SUPER_ADMIN']), adminsController.getAllAdmins)
  .get('/:id', authMiddleware(['SUPER_ADMIN']), adminsController.getAdminById)
  .post('/', authMiddleware(['SUPER_ADMIN']), validations.validateCreate, adminsController.createAdmin)
  .put('/:id', authMiddleware(['SUPER_ADMIN']), validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', authMiddleware(['SUPER_ADMIN']), adminsController.deleteAdmin);

module.exports = router;
