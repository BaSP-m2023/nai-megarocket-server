const fs = require('fs');

const express = require('express');

const router = express.Router();
const membersData = require('../data/member.json');

router.get('/members', (req, res) => {
  const { firstName, lastName, location } = req.query;
  let filteredMembers = membersData;
  if (firstName) {
    filteredMembers = filteredMembers.filter(
      (member) => member.first_name === firstName,
    );
  }
  if (lastName) {
    filteredMembers = filteredMembers.filter(
      (member) => member.last_name === lastName,
    );
  }
  if (location) {
    filteredMembers = filteredMembers.filter(
      (member) => member.location === location,
    );
  }
  res.json(filteredMembers);
});

router.get('/members/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const member = membersData.find((m) => m.id === id);
  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }
  return res.json(member);
});

router.post('/members', (req, res) => {
  const id = membersData.length + 1;
  const body = { id, ...req.body };
  if (Object.values(body).every((el) => el !== '')) {
    const memberEmail = membersData.find((m) => m.email === body.email);
    const memberDni = membersData.find((m) => m.dni === body.dni);
    if (memberEmail) {
      return res
        .status(404)
        .json({ message: 'A member with that email already exists' });
    } if (memberDni) {
      return res
        .status(404)
        .json({ message: 'A member with that dni already exists' });
    }
    membersData.push(body);
    fs.writeFileSync('src/data/member.json', JSON.stringify(membersData));
    return res.json(membersData);
  }
  return res
    .status(404)
    .json({ message: 'Fields are required' });
});

module.exports = router;
