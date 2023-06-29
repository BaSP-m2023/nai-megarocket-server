const express = require('express');

const memberController = require('../controllers/member');
const validateMember = require('../validations/member');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .put('/:id', authMiddleware(['ADMIN', 'MEMBER']), validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', authMiddleware(['ADMIN', 'MEMBER']), memberController.deleteMember)
  .get('/', authMiddleware(['ADMIN', 'MEMBER']), memberController.getAllMembers)
  .get('/:id', authMiddleware(['ADMIN', 'MEMBER']), memberController.getMembersById)
  .post('/', authMiddleware(['ADMIN']), validateMember.validateMembersCreation, memberController.createMembers);

module.exports = router;
