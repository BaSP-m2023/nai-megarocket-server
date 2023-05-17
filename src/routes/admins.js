const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .post('/', validations.validateCreate, adminsController.createAdmin)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = router;
