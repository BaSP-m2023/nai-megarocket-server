const express = require('express');
const { login, logout, register } = require('../controllers/auth');

const router = express.Router();

router
  .post('/register', register)
  .post('/login', login)
  .post('/logout', logout);

module.exports = router;
