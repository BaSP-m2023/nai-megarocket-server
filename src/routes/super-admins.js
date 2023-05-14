const express = require('express');
const superAdminsController = require('../controllers/super-admins');
const validations = require('../validations/super-admins');

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminsById)
  .post('/', validations.validateSuperAdminsCreation, superAdminsController.createSuperAdmins);

module.exports = router;
