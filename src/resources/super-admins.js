const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdmins = require('../data/super-admins.json');

router.put('/update/:id?', (req, res) => {
  const sAIdExist = superAdmins.some((sAdmin) => sAdmin.id.toString() === req.params.id);
  const sAdminsId = req.params.id;
  const updatedSAdmins = req.body;
  const sAdminsIndex = superAdmins.findIndex((member) => member.id.toString() === sAdminsId);
  const sAdminsEmail = superAdmins.find((m) => m.email === updatedSAdmins.email);
  if (!sAIdExist) {
    return res
      .status(400)
      .json({ message: `Super Admin with id: ${req.params.id} was not found` });
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
  if (!sAdminsEmail) {
    superAdmins[sAdminsIndex] = {
      ...superAdmins[sAdminsIndex],
      ...updatedSAdmins,
    };
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2));
    return res.json(superAdmins);
  }
  if (sAdminsEmail.id === sAdminsId) {
    superAdmins[sAdminsIndex] = {
      ...superAdmins[sAdminsIndex],
      ...updatedSAdmins,
    };
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2));
    return res.json(superAdmins);
  }
  return res
    .status(404)
    .json({ message: 'Email already exist on the database' });
});

router.delete('/delete/:id?', (req, res) => {
  const sAIdExist = superAdmins.some((sAdmin) => sAdmin.id.toString() === req.params.id);
  const sAdminsId = req.params.id;
  const filteredSAdmins = superAdmins.filter((sAdmin) => sAdmin.id.toString() !== sAdminsId);
  if (!sAIdExist) {
    return res.json({ message: `Super Admin with id: ${req.params.id} was not found` });
  }
  fs.writeFileSync('src/data/super-admins.json', JSON.stringify(filteredSAdmins, null, 2));
  return res.json(filteredSAdmins);
});

module.exports = router;
