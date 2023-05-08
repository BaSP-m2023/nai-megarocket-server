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

router.post('/post', (req, res) => {
  const id = admins.length + 1;
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const adminEmail = admins.find((m) => m.email === body.email);
    const adminId = admins.find((m) => m.id === body.id);
    if (adminEmail) {
      return res.status(400).json('that email already exists');
    }
    if (adminId) {
      return res.status(400).json('that ID already exists');
    }
    admins.push(body);
    fs.writeFileSync('src/data/admins.json', JSON.stringify(admins, null, 2));
    return res.status(200).json('Admin created!');
  }
  return res.status(400).json('data is required!');
});

module.exports = router;
