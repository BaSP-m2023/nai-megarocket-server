const express = require('express');

const router = express.Router();

const trainer = require('../data/trainer.json');

router.get('/get', (req, res) => {
  if (trainer.length === 0) {
    return res.status(400).json({ message: 'No existing trainer. ' });
  }
  return res.send(trainer);
});

module.exports = router;
