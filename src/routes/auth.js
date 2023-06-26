const express = require('express');
const authControllers = require('../controllers/auth').default;
const memberController = require('../controllers/member');
const validateMember = require('../validations/member');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/login', authMiddleware.verifyToken, authControllers.getAuth)
  .post('/register', validateMember.validateMembersCreation, memberController.createMembers);
// .post('/logout', getAuth);
module.exports = router;
