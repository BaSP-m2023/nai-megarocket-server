const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();
router.get('/get', (req, res) => {
  if (admins.length) {
    res.send(admins);
  } else {
    res.send('Admins not found');
  }
});

router.get('/getById/:id', (req, res) => {
  const adminsID = req.params.id;
  if (!adminsID) {
    res.send('The admin id is required');
  } else {
    const foundAdmin = admins.find((admin) => admin.id.toString() === adminsID);
    if (foundAdmin) {
      res.send(foundAdmin);
    } else {
      res.send('Admin not Found');
    }
  }
});

router.post('/addAdmin', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  if (Object.entries(newAdmin).length === 0) {
    res.send('Admin is required');
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
      if (err) {
        res.send('Error! User cannot not be created');
      } else {
        res.send('Admin created!');
      }
    });
  }
});
module.exports = router;
