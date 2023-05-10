const express = require('express');

const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

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
