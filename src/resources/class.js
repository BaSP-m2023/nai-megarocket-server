const express = require('express');
const fs = require('fs');
const classesData = require('../data/class.json');

const router = express.Router();

router.put('/update/:id', (req, res) => {
  const ToUpdate = req.body;
  if (Object.keys(ToUpdate).length === 0) {
    res.send('No class defined to update');
  }
  const classToUpdate = classesData.find((classs) => classs.id.toString() === req.params.id);
  if (!classToUpdate) {
    res.send('Class not found');
  }
  classToUpdate.class = req.body.class || classToUpdate.class;
  classToUpdate.trainer = req.body.trainer || classToUpdate.trainer;
  classToUpdate.room = req.body.room || classToUpdate.room;
  fs.writeFile('src/data/class.json', JSON.stringify(classesData, null, 2), ((err) => {
    if (err) {
      res.send('Class cannot be edited!');
    }
    res.send('Class edited succesfully!');
  }));
});

router.delete('/delete/:id', (req, res) => {
  const classId = req.params.id;
  const filteredClass = classesData.filter((classs) => classs.id.toString() !== classId);
  fs.writeFile('src/data/class.json', JSON.stringify(filteredClass, null, 2), ((err) => {
    if (err) {
      res.send('Error! Class cannot be deleted!');
    } else {
      res.send('Class deleted succesfully!');
    }
  }));
});

module.exports = router;
