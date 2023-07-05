const express = require('express');
const authControllers = require('../controllers/auth').default;
const validateMember = require('../validations/member');
const memberController = require('../controllers/member');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/login', authMiddleware(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), authControllers.getAuth)
  .post('/register', validateMember.validateMembersCreation, memberController.createMembers);

module.exports = router;
