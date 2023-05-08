const express = require('express');

const router = express.Router();

const classes = require('../data/class.json');

router.get('/get', (req, res) => res.json(classes));

router.get('/getById/:id', (req, res) => {
  res.json(req.params);
});
router.post('/post', (req, res) => {
  res.json(req.params);
});

module.exports = router;
