const express = require('express');
const subs = require('../data/subscription.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.json(subs);
});

router.get('/getById/:id', (req, res) => {
  const found = subs.some((sub) => sub.id.toString() === req.params.id);

  if (found) {
    res.json(subs.find((sub) => sub.id.toString() === req.params.id));
  } else res.status(400).json({ msg: `This id doesn't exist (${req.params.id})` });
});

module.exports = router;
