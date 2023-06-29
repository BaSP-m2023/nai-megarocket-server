const express = require('express');
const authControllers = require('../controllers/auth').default;
const memberController = require('../controllers/member');
const authMiddleware = require('../middlewares/authMiddleware').default;

const router = express.Router();

router
  .get('/login', authMiddleware(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), authControllers.getAuth)
  .post('/register', memberController.createMembers);
module.exports = router;
