const express = require('express');
const memberController = require('../controllers/member');
const validateMember = require('../validations/member');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .get('/', verifyToken(['ADMIN', 'TRAINER', 'MEMBER']), memberController.getAllMembers)
  .get('/:id', verifyToken(['ADMIN', 'TRAINER', 'MEMBER']), memberController.getMembersById)
  .post('/', verifyToken(['ADMIN', 'MEMBER']), validateMember.validateMembersCreation, memberController.createMembers)
  .put('/:id', verifyToken(['ADMIN', 'MEMBER']), validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', verifyToken(['ADMIN', 'MEMBER']), memberController.deleteMember);

module.exports = router;
