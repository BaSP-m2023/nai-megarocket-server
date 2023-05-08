const express = require('express');
const fs = require('fs');

const router = express.Router();

const data = require('../data/trainer.json');

router.put('/update/:id', (req, res) => {
  const toUpdate = req.body;
  if (Object.entries(toUpdate).length === 0) {
    return res.status(400).json({ success: false, msg: 'the trainer to update must be defined' });
  }
  const trainerToUpdate = data.find((trainer) => trainer.id.toString() === req.params.id);
  if (!trainerToUpdate) {
    return res.status(400).json({ sucess: false, msg: 'trainer not found' });
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(toUpdate)) {
    trainerToUpdate[key] = value;
  }
  const index = data.indexOf(trainerToUpdate);
  data[index] = trainerToUpdate;
  fs.writeFileSync('src/data/trainer.json', JSON.stringify(data, null, 2));
  return res.status(200).json({ success: true, msg: 'trainer updated', trainer: trainerToUpdate });
});

module.exports = router;
