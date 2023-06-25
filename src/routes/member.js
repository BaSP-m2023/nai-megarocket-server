const express = require('express');
const memberController = require('../controllers/member');
const validateMember = require('../validations/member');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), memberController.getAllMembers)
  .get('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), memberController.getMembersById)
  .post('/', validateMember.validateMembersCreation, memberController.createMembers)
  .put('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', verifyToken(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), memberController.deleteMember);

module.exports = router;
