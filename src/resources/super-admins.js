const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdminsData = require('../data/super-admins.json');

router.put('/superAdmins/update/:id', (req, res) => {
  const superAdminsId = parseInt(req.params.id, 10);
  const updatedSuperAdmins = req.body;
  const superAdmins = JSON.parse(fs.readFileSync('src/data/member.json', 'utf8'));
  const superAdminsIndex = superAdmins.findIndex((member) => member.id === superAdminsId);
  const superAdminsEmail = superAdminsData.find((m) => m.email === updatedSuperAdmins.email);
  if (superAdminsIndex >= 0) {
    if (!superAdminsEmail) {
      superAdmins[superAdminsIndex] = {
        ...superAdmins[superAdminsIndex],
        ...updatedSuperAdmins,
      };
      fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmins));
      res.json(superAdmins);
    } else if (superAdminsEmail.id === superAdminsId) {
      superAdmins[superAdminsIndex] = {
        ...superAdmins[superAdminsIndex],
        ...updatedSuperAdmins,
      };
      fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmins));
      res.json(superAdmins);
    } else {
      res.status(404).json({ message: 'Email already exist on the database' });
    }
  } else {
    res.status(404).json({ message: 'Super Admin not found' });
  }
});

router.delete('/superAdmins/delete/:id', (req, res) => {
  const superAdminsId = parseInt(req.params.id, 10);
  const superAdmins = JSON.parse(fs.readFileSync('src/data/super-admins.json', 'utf8'));
  const filteredSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminsId);
  if (filteredSuperAdmins.length < superAdmins.length) {
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(filteredSuperAdmins));
    res.json(filteredSuperAdmins);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

module.exports = router;
