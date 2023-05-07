const fs = require('fs');

const express = require('express');

const router = express.Router();
const membersData = require('../data/member.json');

router.get('/get', (req, res) => {
  if (membersData.length === 0) {
    return res.status(400).json({ message: 'Members data is empty' });
  }
  return res.send(membersData);
});

router.get('/getById/:id?', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Id is required' });
  }
  if (Number.isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const member = membersData.find((m) => m.id.toString() === req.params.id);
  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }
  return res.send(member);
});

router.post('/post', (req, res) => {
  const id = membersData.length + 1;
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const memberEmail = membersData.find((m) => m.email === body.email);
    const memberDni = membersData.find((m) => m.dni === body.dni);
    if (memberEmail) {
      return res.status(400).json({ message: 'A member with that email already exists' });
    }
    if (memberDni) {
      return res.status(400).json({ message: 'A member with that dni already exists' });
    }
    membersData.push(body);
    fs.writeFileSync('src/data/member.json', JSON.stringify(membersData, null, 2));
    return res.status(200).json({ message: 'Member added successfully' });
  }
  return res.status(400).json({ message: 'Fields are required' });
});

module.exports = router;
