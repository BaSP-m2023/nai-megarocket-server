const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdminsData = require('../data/super-admins.json');

router.put('/update/:id', (req, res) => {
  const superAdminsId = parseInt(req.params.id, 10);
  const updatedSuperAdmins = req.body;
  const superAdminsIndex = superAdminsData
    .findIndex((member) => member.id === superAdminsId);
  const superAdminsEmail = superAdminsData
    .find((m) => m.email === updatedSuperAdmins.email);
  if (!superAdminsId) {
    return res.status(400).json({ message: 'ID is required' });
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
  if (superAdminsIndex >= 0) {
    if (!superAdminsEmail) {
      superAdminsData[superAdminsIndex] = {
        ...superAdminsData[superAdminsIndex],
        ...updatedSuperAdmins,
      };
      fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdminsData));
      return res.json(superAdminsData);
    }
    if (superAdminsEmail.id === superAdminsId) {
      superAdminsData[superAdminsIndex] = {
        ...superAdminsData[superAdminsIndex],
        ...updatedSuperAdmins,
      };
      fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdminsData));
      return res.json(superAdminsData);
    }
    return res
      .status(404)
      .json({ message: 'Email already exist on the database' });
  }
  return res.status(404).json({ message: 'Super Admin not found' });
});

router.delete('/delete/:id', (req, res) => {
  const superAdminsId = parseInt(req.params.id, 10);
  const filteredSuperAdmins = superAdminsData
    .filter((superAdmin) => superAdmin.id !== superAdminsId);
  if (req.params.id) {
    if (filteredSuperAdmins.length < superAdminsData.length) {
      fs.writeFileSync('src/data/super-admins.json', JSON.stringify(filteredSuperAdmins));
      res.json(filteredSuperAdmins);
    } else {
      res.status(404).json({ message: 'Super Admin not found' });
    }
  } else {
    res.json({ message: 'Id needed to delete a Supe-admin' });
  }
});

module.exports = router;
