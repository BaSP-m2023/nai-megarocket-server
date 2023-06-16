const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const superAdminsValidation = require('../validations/super-admins');

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminsById)
  .post('/', superAdminsValidation.validateSuperAdminsCreation, superAdminsController.createSuperAdmins)
  .put('/:id?', superAdminsValidation.validateSuperAdminUpdate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', superAdminsController.deleteSuperAdmin);

module.exports = router;
