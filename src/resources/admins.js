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
  let id;
  if (admins.length === 0) {
    id = 0;
  } else {
    id = admins[admins.length - 1].id;
  }
  const body = { id: id + 1, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const adminEmail = admins.find((m) => m.email === body.email);
    if (adminEmail) {
      return res.status(400).json('that email already exists');
    }
    admins.push(body);
    fs.writeFileSync('src/data/admins.json', JSON.stringify(admins, null, 2));
    return res.status(200).json('Admin created!');
  }
  return res.status(400).json('data is required!');
});

router.put('/update/:id', (req, res) => {
  const adminID = req.params.id;
  const adminExist = admins.find((admin) => admin.id.toString() === adminID);
  const adminIndex = admins.findIndex((admin) => admin.id.toString() === adminID);
  const adminToUpdate = admins[adminIndex];

  if (!adminExist) {
    res.send('The id doesn\'t match to any Admin');
  }

  const allowedKeys = ['name', 'lastName', 'email', 'password'];
  const invalidFKeys = Object.keys(req.body).filter((field) => !allowedKeys.includes(field));

  if (invalidFKeys.length > 0) {
    res.send(`Invalid keys: ${invalidFKeys.join(', ')}`);
  }

  if (
    !req.body.name
    && !req.body.lastName
    && !req.body.email
    && !req.body.password
  ) {
    res.send('Please provide at least one field to update');
  }
  if (req.body.name) {
    adminToUpdate.name = req.body.name;
  }
  if (req.body.lastName) {
    adminToUpdate.lastName = req.body.lastName;
  }
  if (req.body.email) {
    adminToUpdate.email = req.body.email;
  }
  if (req.body.password) {
    adminToUpdate.password = req.body.password;
  }

  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.send('ERROR Admin can\'t be updated!');
    } else {
      res.send('Admin updated');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const adminID = req.params.id;
  const adminToUpdate = admins.find((admin) => admin.id.toString() === adminID);
  if (!adminToUpdate) {
    res.send('The id doesn\'t match to any Admin');
    return;
  }
  const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminID);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
    if (err) {
      res.send('ERROR: User can\'t be deleted!');
    } else {
      res.send('User deleted');
    }
  });
});

module.exports = router;
