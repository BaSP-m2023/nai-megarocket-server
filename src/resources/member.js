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

module.exports = router;
