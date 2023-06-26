const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const superAdminsValidation = require('../validations/super-admins');
const superAdminMiddleware = require('../middlewares/superAdminMiddleware').default;

const router = express.Router();

router
  .get('/', superAdminMiddleware.verifySuperAdmin, superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminMiddleware.verifySuperAdmin, superAdminsController.getSuperAdminsById)
  .post('/', superAdminMiddleware.verifySuperAdmin, superAdminsValidation.validateSuperAdminsCreation, superAdminsController.createSuperAdmins)
  .put('/:id?', superAdminMiddleware.verifySuperAdmin, superAdminsValidation.validateSuperAdminUpdate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', superAdminMiddleware.verifySuperAdmin, superAdminsController.deleteSuperAdmin);

module.exports = router;
