const mongoose = require('mongoose');
const firebaseApp = require('../helper/firebase/index').default;
const Member = require('../models/member');

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();

    if (members.length > 0) {
      return res.status(200).json({
        message: 'Members list',
        data: members,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Members not found',
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const getMembersById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid ID',
        data: id,
        error: true,
      });
    }

    if (member) {
      return res.status(200).json({
        message: `Member Found! ${member.firstName} ${member.lastName}`,
        data: member,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Member was not found',
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const createMembers = async (req, res) => {
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
  let firebaseUid;
  try {
    const existingMember = await Member.findOne({ $or: [{ dni }, { email }] });

    if (existingMember) {
      return res.status(400).json({
        message: 'This member is already registered',
        error: true,
      });
    }
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email,
      password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'MEMBER' });

    const createMember = await Member.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership,
    });

    return res.status(201).json({
      message: 'Member was successfully created',
      data: createMember,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error!',
      error,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
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

    const sameMember = await Member.findOne({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership,
    });

    if (sameMember) {
      return res.status(400).json({
        message: 'There is nothing to change',
        data: undefined,
        error: true,
      });
    }

    const memberToUpdate = await Member.findById(id);

    await firebaseApp.auth().updateUser(memberToUpdate.firebaseUid, {
      password,
      email,
    });

    const memberUpdated = await Member.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        birthDay,
        postalCode,
        isActive,
        membership,
      },
      { new: true },
    );

    if (!memberUpdated) {
      return res.status(404).json({
        message: 'The member was not found',
        data: undefined,
        error: true,
      });
    }

    const existingMember = await Member.findOne({
      $and: [
        {
          $or: [{ dni }, { email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });

    if (existingMember) {
      return res.status(400).json({
        message: 'This member already exists.',
        data: existingMember,
        error: true,
      });
    }

    return res.status(200).json({
      message: `The member ${memberUpdated.firstName} ${memberUpdated.lastName} was successfully updated.`,
      data: memberUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This id has an invalid format',
        error: true,
      });
    }

    const memberToDelete = await Member.findById(id);

    await firebaseApp.auth().deleteUser(memberToDelete.firebaseUid);
    const memberDeleted = await Member.deleteOne(memberToDelete);

    if (!memberDeleted) {
      return res.status(404).json({
        message: 'The member was not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Member ${memberToDelete.firstName} ${memberToDelete.lastName} was successfully deleted`,
      data: memberToDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

module.exports = {
  updateMember,
  deleteMember,
  getAllMembers,
  getMembersById,
  createMembers,
};
