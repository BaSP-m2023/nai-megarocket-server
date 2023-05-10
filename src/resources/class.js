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

router.put('/update/:id', (req, res) => {
  const ToUpdate = req.body;
  if (Object.keys(ToUpdate).length === 0) {
    res.send('No class defined to update');
  }
  const classToUpdate = classes.find((classs) => classs.id.toString() === req.params.id);
  if (!classToUpdate) {
    res.send('Class not found');
  }
  classToUpdate.class = req.body.class || classToUpdate.class;
  classToUpdate.trainer = req.body.trainer || classToUpdate.trainer;
  classToUpdate.room = req.body.room || classToUpdate.room;
  fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), ((err) => {
    if (err) {
      res.send('Class cannot be edited!');
    }
    res.send('Class edited succesfully!');
  }));
});

router.delete('/delete/:id', (req, res) => {
  const classId = req.params.id;
  const filteredClass = classes.filter((classs) => classs.id.toString() !== classId);
  fs.writeFile('src/data/class.json', JSON.stringify(filteredClass, null, 2), ((err) => {
    if (err) {
      res.send('Error! Class cannot be deleted!');
    } else {
      res.send('Class deleted succesfully!');
    }
  }));
});

module.exports = router;
