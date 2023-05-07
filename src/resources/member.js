const fs = require('fs');

const express = require('express');

const router = express.Router();
const membersData = require('../data/member.json');

router.put('/update/:id?', (req, res) => {
  const memberIdExist = membersData.some((member) => member.id.toString() === req.params.id);
  const memberId = req.params.id;
  const updatedMember = req.body;
  const memberIndex = membersData.findIndex((member) => member.id.toString() === memberId);
  const memberemail = membersData.find((m) => m.email === updatedMember.email);
  if (!memberIdExist) {
    return res
      .status(400)
      .json({ message: `Member with id: ${req.params.id} was not found` });
  }
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }
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
});

router.delete('/delete/:id?', (req, res) => {
  const memberIdExist = membersData.some((member) => member.id.toString() === req.params.id);
  const memberId = req.params.id;
  const filteredMembers = membersData.filter((member) => member.id.toString() !== memberId);
  if (!memberIdExist) {
    return res.json({ message: `Member with id: ${req.params.id} was not found` });
  }
  fs.writeFileSync('src/data/member.json', JSON.stringify(filteredMembers));
  return res.json(filteredMembers);
});

module.exports = router;
