const mongoose = require('mongoose');
const Member = require('../models/member');

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
        data: id,
        error: true,
      });
    }

    const result = await Member.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `The member with _id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    const repeatedDni = await Member.findOne({ dni });
    // eslint-disable-next-line no-underscore-dangle
    if (repeatedDni && repeatedDni.toObject()._id.toString() !== id) {
      return res.status(400).json({
        message: 'Member with this DNI is already register',
        data: undefined,
        error: true,
      });
    }

    const repeatedMail = await Member.findOne({ email });
    // eslint-disable-next-line no-underscore-dangle
    if (repeatedMail && repeatedMail.toObject()._id.toString() !== id) {
      return res.status(400).json({
        message: 'Member with this Email is already register',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `The member ${result.firstName} ${result.lastName} was successfully updated.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'This _id has invalid format',
      error: true,
    });
  }
  return Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `The member with _id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member ${result.firstName} ${result.lastName} deleted`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => {
      if (members.length > 0) {
        res.status(200).json({
          message: 'Members list',
          data: members,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'No Members on the list, please create one.',
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getMembersById = (req, res) => {
  const { id } = req.params;

  Member.findById(id)
    .then((members) => {
      if (members !== null) {
        res.status(200).json({
          message: `Member Found! ${members.firstName} ${members.lastName}`,
          data: members,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `Member not found with id: ${id}`,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const createMembers = (req, res) => {
  const { id } = req.params;
  Member.findOne({ $or: [{ dni: req.body.dni }, { email: req.body.email }] })
    .then((repeated) => {
      if (repeated && Object.values(repeated.toObject())[0].toString() !== id) {
        return res.status(400).json({
          message: 'This member is already register',
          error: true,
        });
      }
      const {
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
      } = req.body;
      return Member.create({
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
      }).then((result) => res.status(201).json({
        message: 'Member Created!',
        data: result,
        error: false,
      }));
    })
    .catch((error) => res.status(500).json({
      message: 'Error!',
      error,
    }));
};

module.exports = {
  updateMember,
  deleteMember,
  getAllMembers,
  getMembersById,
  createMembers,
};
