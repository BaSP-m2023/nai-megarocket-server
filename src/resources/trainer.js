const express = require('express');

const router = express.Router();

const data = require('../data/trainer.json');

router.get('/getbyid/:id', (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(parseInt(id, 10))) {
    return res.status(400).json({ success: false, msg: 'id must be a number.' });
  }
  const trainerToSend = data.find((trainer) => trainer.id.toString() === id);
  if (!trainerToSend) {
    return res.status(404).json({ success: false, msg: 'trainer not found.' });
  }
  return res.status(200).json({ success: true, trainer: trainerToSend });
});

module.exports = router;
