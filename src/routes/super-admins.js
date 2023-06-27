const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const superAdminsValidation = require('../validations/super-admins');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/', authMiddleware(['SUPER_ADMIN']), superAdminsController.getAllSuperAdmins)
  .get('/:id', authMiddleware(['SUPER_ADMIN']), superAdminsController.getSuperAdminsById)
  .post('/', authMiddleware(['SUPER_ADMIN']), superAdminsValidation.validateSuperAdminsCreation, superAdminsController.createSuperAdmins)
  .put('/:id?', authMiddleware(['SUPER_ADMIN']), superAdminsValidation.validateSuperAdminUpdate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', authMiddleware(['SUPER_ADMIN']), superAdminsController.deleteSuperAdmin);

module.exports = router;
