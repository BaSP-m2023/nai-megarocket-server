const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const superAdminsValidation = require('../validations/super-admins');

const router = express.Router();

router
  .put('/:id?', superAdminsValidation.validate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', superAdminsController.deleteSuperAdmin);

module.exports = router;
