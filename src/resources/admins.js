const express = require('express');

const fs = require('fs');

const admins = require('../data/admins.json');

const router = express.Router();

router.put('/update/:id', (req, res) => {
  const adminID = req.params.id;
  const adminToUpdate = admins.find((admin) => admin.id.toString() === adminID);
  if (!adminToUpdate) {
    res.send('Admin not found');
    return;
  }
  adminToUpdate.name = req.body.name || adminToUpdate.name;
  adminToUpdate.lastName = req.body.lastName || adminToUpdate.lastName;
  adminToUpdate.email = req.body.email || adminToUpdate.email;
  adminToUpdate.password = req.body.password || adminToUpdate.password;

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
  const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminID);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
    if (err) {
      res.send('ERROR User can\'t be deleted!');
    } else {
      res.send('User deleted');
    }
  });
});

module.exports = router;
