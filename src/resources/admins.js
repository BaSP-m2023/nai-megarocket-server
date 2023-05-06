const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(admins);
});

router.get('/:id', (req, res) => {
  const adminsID = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminsID);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not Found');
  }
});

router.post('/', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.send('Error! User cannot not be created');
    } else {
      res.send('Admin created!');
    }
  });
});
module.exports = router;