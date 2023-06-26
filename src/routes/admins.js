const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');
const superAdminMiddleware = require('../middlewares/superAdminMiddleware').default;

const router = express.Router();

router
  .get('/', superAdminMiddleware.verifySuperAdmin, adminsController.getAllAdmins)
  .get('/:id', superAdminMiddleware.verifySuperAdmin, adminsController.getAdminById)
  .post('/', superAdminMiddleware.verifySuperAdmin, validations.validateCreate, adminsController.createAdmin)
  .put('/:id', superAdminMiddleware.verifySuperAdmin, validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', superAdminMiddleware.verifySuperAdmin, adminsController.deleteAdmin);

module.exports = router;
