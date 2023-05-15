const express = require('express');

const memberController = require('../controllers/member');
const validateMember = require('../validations/member');

const router = express.Router();

router
  .put('/:id', validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', memberController.deleteMember)
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMembersById)
  .post('/', validateMember.validateMembersCreation, memberController.createMembers);

module.exports = router;
