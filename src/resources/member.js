const fs = require('fs');

const express = require('express');

const router = express.Router();
const membersData = require('../data/member.json');

router.put('/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const updatedMember = req.body;
  const members = JSON.parse(fs.readFileSync('src/data/member.json', 'utf8'));
  const memberIndex = members.findIndex((member) => member.id === memberId);
  const memberemail = membersData.find((m) => m.email === updatedMember.email);
  if (memberIndex >= 0) {
    if (!memberemail) {
      members[memberIndex] = { ...members[memberIndex], ...updatedMember };
      fs.writeFileSync('src/data/member.json', JSON.stringify(members));
      res.json(members);
    } else if (memberemail.id === memberId) {
      members[memberIndex] = { ...members[memberIndex], ...updatedMember };
      fs.writeFileSync('src/data/member.json', JSON.stringify(members));
      res.json(members);
    } else {
      res.status(404).json({ message: 'Email already exist on the database' });
    }
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

router.delete('/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const members = JSON.parse(fs.readFileSync('src/data/member.json', 'utf8'));
  const filteredMembers = members.filter((member) => member.id !== memberId);
  if (filteredMembers.length < members.length) {
    fs.writeFileSync('src/data/member.json', JSON.stringify(filteredMembers));
    res.json(filteredMembers);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

module.exports = router;
