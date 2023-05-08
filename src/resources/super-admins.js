const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdmin = require('../data/super-admins.json');

router.get('/get', (req, res) => {
  if (superAdmin.length === 0) {
    return res.status(400).json({ message: 'Super admins data is empty' });
  }
  return res.send(superAdmin);
});

router.get('/getById/:id?', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Id is required' });
  }
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const superA = superAdmin.find((m) => m.id.toString() === req.params.id);
  if (!superA) {
    return res.status(404).json({ message: 'Super admin not found' });
  }
  return res.send(superA);
});

router.post('/post', (req, res) => {
  const id = superAdmin.length + 1;
  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({ message: 'you have to specify email and password' });
  }
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const superAEmail = superAdmin.find((s) => s.email === body.email);
    if (superAEmail) {
      return res.status(400).json({ message: 'Super admin with that email already exists' });
    }
    superAdmin.push(body);
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmin, null, 2));
    return res.send(superAdmin);
  }
  return res.status(400).json({ message: 'Fields are required' });
});

module.exports = router;
