const Member = require('../models/member');

const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => {
      res.status(200).json({
        message: 'Members list: ',
        data: members,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error,
      });
    });
};

const getMembersById = (req, res) => {
  const { id } = req.params;

  Member.findById(id)
    .then((members) => res.status(200).json({
      message: `Member found! ${members.firstName}`,
      data: members,
      error: false,
    }))
    .catch((error) => res.json({
      message: 'Error',
      error,
    }));
};

const createMembers = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, password, city, birthDay, postalCode, isActive,
    membership,
  } = req.body;

  Member.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    password,
    city,
    birthDay,
    postalCode,
    isActive,
    membership,
  })
    .then((result) => res.status(201).json({
      message: 'Member Created!',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error!',
      error,
    }));
};

module.exports = {
  getAllMembers,
  getMembersById,
  createMembers,
};
