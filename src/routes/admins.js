const express = require('express');
const adminController = require('../controllers/admins');
const validation = require('../validations/admins');

const router = express.Router();

router
  .get('/', adminController.getAllAdmins)
  .get('/:id', adminController.getAdminById)
  .post('/', validation.validateAdminCreate, adminController.createNewAdmin);

module.exports = router;
