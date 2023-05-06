const fs = require('fs');

const express = require('express');

const router = express.Router();
const membersData = require('../data/member.json');

router.put('/update/:id?', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const updatedMember = req.body;
  const memberIndex = membersData
    .findIndex((member) => member.id === memberId);
  const memberemail = membersData
    .find((m) => m.email === updatedMember.email);
  if (!memberId) {
    return res.status(400).json({ message: 'ID is required' });
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
  if (memberIndex >= 0) {
    if (!memberemail) {
      membersData[memberIndex] = {
        ...membersData[memberIndex],
        ...updatedMember,
      };
      fs.writeFileSync('src/data/member.json', JSON.stringify(membersData));
      return res.json(membersData);
    }
    if (memberemail.id === memberId) {
      membersData[memberIndex] = {
        ...membersData[memberIndex],
        ...updatedMember,
      };
      fs.writeFileSync('src/data/member.json', JSON.stringify(membersData));
      return res.json(membersData);
    }
    return res
      .status(404)
      .json({ message: 'Email already exist on the database' });
  }
  return res.status(404).json({ message: 'Member not found' });
});

router.delete('/delete/:id', (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const filteredMembers = membersData
    .filter((member) => member.id !== memberId);
  if (req.params.id) {
    if (filteredMembers.length < membersData.length) {
      fs.writeFileSync('src/data/member.json', JSON.stringify(filteredMembers));
      res.json(filteredMembers);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } else {
    res.json({ message: 'Id needed to delete a user' });
  }
});

module.exports = router;
