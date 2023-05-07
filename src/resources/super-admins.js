const fs = require('fs');

const express = require('express');

const router = express.Router();
const sAdminsData = require('../data/super-admins.json');

router.put('/update/:id?', (req, res) => {
  const sAIdExist = sAdminsData.some((sAdmin) => sAdmin.id.toString() === req.params.id);
  const sAdminsId = req.params.id;
  const updatedSAdmins = req.body;
  const sAdminsIndex = sAdminsData.findIndex((member) => member.id.toString() === sAdminsId);
  const sAdminsEmail = sAdminsData.find((m) => m.email === updatedSAdmins.email);
  if (!sAIdExist) {
    return res
      .status(400)
      .json({ message: `Super Admin with id: ${req.params.id} was not found` });
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
  if (!sAdminsEmail) {
    sAdminsData[sAdminsIndex] = {
      ...sAdminsData[sAdminsIndex],
      ...updatedSAdmins,
    };
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(sAdminsData));
    return res.json(sAdminsData);
  }
  if (sAdminsEmail.id === sAdminsId) {
    sAdminsData[sAdminsIndex] = {
      ...sAdminsData[sAdminsIndex],
      ...updatedSAdmins,
    };
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(sAdminsData));
    return res.json(sAdminsData);
  }
  return res
    .status(404)
    .json({ message: 'Email already exist on the database' });
});

router.delete('/delete/:id?', (req, res) => {
  const sAIdExist = sAdminsData.some((sAdmin) => sAdmin.id.toString() === req.params.id);
  const sAdminsId = parseInt(req.params.id, 10);
  const filteredSAdmins = sAdminsData.filter((sAdmin) => sAdmin.id !== sAdminsId);
  if (!sAIdExist) {
    return res.json({ message: `Super Admin with id: ${req.params.id} was not found` });
  }
  fs.writeFileSync('src/data/super-admins.json', JSON.stringify(filteredSAdmins));
  return res.json(filteredSAdmins);
});

module.exports = router;
