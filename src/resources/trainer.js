const fs = require('fs');

const express = require('express');

const router = express.Router();
const trainers = require('../data/trainer.json');

router.get('/get', (req, res) => {
  if (trainers.length === 0) {
    return res.status(400).json({ message: 'No existing trainer. ' });
  }
  return res.send(trainers);
});

router.delete('/delete/:id', (req, res) => {
  const trainerId = req.params.id;
  const trainerFiltered = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (!trainerFiltered) {
    res.status(400).send('The id doesn\'t match to any Trainer');
    return;
  }
  const trainerFilteredToDelete = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
  fs.writeFile('src/data/trainer.json', JSON.stringify(trainerFilteredToDelete, null, 2), (err) => {
    if (err) {
      res.status(400).send('ERROR:This trainer can\'t be deleted!');
    } else {
      res.status(200).send('Trainer deleted!');
    }
  });
});

module.exports = router;
