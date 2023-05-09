const fs = require('fs');

const express = require('express');

const router = express.Router();

const classes = require('../data/class.json');

router.get('/get', (req, res) => {
  if (classes.length === 0) {
    return res.status(400).json({ message: 'The class input is empty. ' });
  }
  return res.send(classes);
});

router.get('/getById/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'The Id is required. ' });
  }
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: 'The Id must be a number. ' });
  }
  const classAvailable = classes.find((classs) => classs.id.toString() === req.params.id);
  if (!classAvailable) {
    return res.status(404).json({ message: 'The requested class does not exist. ' });
  }
  return res.status(200).json(classAvailable);
});

router.post('/post', (req, res) => {
  const newId = Object.keys(classes).length + 1;
  const newClass = (req.body);
  if (Object.entries(newClass).length === 0) {
    return res.status(400).json({ message: 'Fields are required. ' });
  }
  const classBe = classes.find((c) => c.class === req.body.class);
  if (classBe) {
    return res.status(400).json({ message: 'The class has already exists. ' });
  }
  if (newClass.duration_hours > 1) {
    return res.status(400).json({ message: 'Classes can be 1 hour long maximum. ' });
  }
  classes[newId - 1] = { id: newId, ...req.body };
  fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
  return res.send(classes);
});

module.exports = router;
