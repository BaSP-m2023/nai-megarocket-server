const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdmins = require('../data/super-admins.json');

router.get('/get', (req, res) => {
  if (superAdmins.length === 0) {
    return res.status(400).json({ message: 'Super admins data is empty' });
  }
  return res.send(superAdmins);
});

router.get('/getById/:id?', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Id is required' });
  }
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const superA = superAdmins.find((m) => m.id.toString() === req.params.id);
  if (!superA) {
    return res.status(404).json({ message: 'Super admin not found' });
  }
  return res.send(superA);
});

router.post('/post', (req, res) => {
  const id = superAdmins.length + 1;
  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({ message: 'you have to specify email and password' });
  }
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const superAEmail = superAdmins.find((s) => s.email === body.email);
    if (superAEmail) {
      return res.status(400).json({ message: 'Super admin with that email already exists' });
    }
    superAdmins.push(body);
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2));
    return res.send(superAdmins);
  }
  return res.status(400).json({ message: 'Fields are required' });
});

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
  if (sAdminsEmail.id.toString() === sAdminsId) {
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
