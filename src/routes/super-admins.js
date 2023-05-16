const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const validations = require('../validations/super-admins');
const superAdminsValidation = require('../validations/super-admins');

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminsById)
  .post('/', validations.validateSuperAdminsCreation, superAdminsController.createSuperAdmins)
  .put('/:id?', superAdminsValidation.validate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', superAdminsController.deleteSuperAdmin);

module.exports = router;
