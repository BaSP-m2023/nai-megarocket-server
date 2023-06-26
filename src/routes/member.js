const express = require('express');

const memberController = require('../controllers/member');
const validateMember = require('../validations/member');
const adminMiddleware = require('../middlewares/adminMiddleware').default;
const adminMemberMiddleware = require('../middlewares/adminMemberMiddleware').default;
const adminTrainerMemberMiddleware = require('../middlewares/adminTrainerMemberMiddleware').default;

const router = express.Router();

router
  .put('/:id', adminMemberMiddleware.verifyAdminMember, validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', adminMiddleware.verifyAdmin, memberController.deleteMember)
  .get('/', adminMiddleware.verifyAdmin, memberController.getAllMembers)
  .get('/:id', adminTrainerMemberMiddleware.verifyAdminTrainerMember, memberController.getMembersById)
  .post('/', adminMemberMiddleware.verifyAdminMember, validateMember.validateMembersCreation, memberController.createMembers);

module.exports = router;
