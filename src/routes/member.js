const express = require('express');
const membersController = require('../controllers/member');
const validations = require('../validations/member');

const router = express.Router();

router
  .get('/', membersController.getAllMembers)
  .get('/:id', membersController.getMembersById)
  .post('/', validations.validateMembersCreation, membersController.createMembers);

module.exports = router;
