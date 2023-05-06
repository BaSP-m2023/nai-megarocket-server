const fs = require('fs');

const express = require('express');

const router = express.Router();
const superAdmin = require('../data/super-admins.json');

router.get('/get', (req, res) => {
  const { email } = req.query;
  let filteredSuperA = superAdmin;
  if (email) {
    filteredSuperA = filteredSuperA.filter((sa) => sa.email === email);
  }
  if (filteredSuperA.length === 0) {
    return res.status(404).json({ message: 'Super admin not found' });
  }
  return res.json(filteredSuperA);
});

router.get('/getById/:id?', (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({ message: 'Id is required' });
  }
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(404).json({ message: 'Id must be a number' });
  }
  const superA = superAdmin.find((m) => m.id.toString() === req.params.id);
  if (!superA) {
    return res.status(404).json({ message: 'Super admin not found' });
  }
  return res.json(superA);
});

router.post('/post', (req, res) => {
  const id = superAdmin.length + 1;
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const superAEmail = superAdmin.find((s) => s.email === body.email);
    if (superAEmail) {
      return res.status(404).json({ message: 'Super admin with that email already exists' });
    }
    superAdmin.push(body);
    fs.writeFileSync('src/data/super-admins.json', JSON.stringify(superAdmin));
    return res.json(superAdmin);
  }
  return res.status(404).json({ message: 'Fields are required' });
});

module.exports = router;
