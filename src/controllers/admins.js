const { default: mongoose } = require('mongoose');
const firebaseApp = require('../helper/firebase/index').default;
const Admin = require('../models/admins');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) {
      return res.status(404).json({
        message: 'Admins not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admins list',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has occurred',
      data: undefined,
      error,
    });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }
  try {
    const foundAdmin = await Admin.findById(id);
    if (!foundAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: foundAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has occurred',
      data: undefined,
      error,
    });
  }
};

const createAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  } = req.body;
  let firebaseUid;

  try {
    const alreadyExists = await Admin.findOne({ $or: [{ dni }, { email }] });

    if (alreadyExists) {
      return res.status(400).json({
        message: 'This admin already exists',
        data: undefined,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email,
      password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const adminCreated = await Admin.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
    });

    return res.status(201).json({
      message: 'Admin was successfully created',
      data: adminCreated,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.toString(),
      err,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'The ID is not valid',
        data: id,
        error: true,
      });
    }

    const {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
    } = req.body;

    const adminToUpdate = await Admin.findById(id);

    if (!adminToUpdate) {
      return res.status(404).json({
        message: 'Admin was not found',
        data: undefined,
        error: true,
      });
    }

    const sameAdmin = await Admin.findOne({
      firstName, lastName, dni, phone, email, city,
    });

    if (sameAdmin) {
      return res.status(400).json({
        message: 'There is nothing to change',
        data: undefined,
        error: false,
      });
    }

    const anAdminAlreadyHas = await Admin.findOne({
      $and: [
        {
          $or: [{ dni }, { email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });

    if (anAdminAlreadyHas) {
      return res.status(400).json({
        message: 'This admin already exists',
        data: undefined,
        error: true,
      });
    }

    const adminUpdated = await Admin.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
      },
      { new: true },
    );

    return res.status(200).json({
      message: 'Admin was successfully updated',
      data: adminUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id format',
        error: true,
      });
    }

    const adminToDelete = await Admin.findById(id);
    const adminDeleted = await Admin.deleteOne(adminToDelete);
    if (!adminDeleted) {
      return res.status(404).json({
        message: 'Admin was not found',
        data: undefined,
        error: true,
      });
    }

    await firebaseApp.auth().deleteUser(adminToDelete.firebaseUid);

    return res.status(200).json({
      message: `Admin ${adminToDelete.firstName} ${adminToDelete.lastName} was successfully deleted`,
      data: adminToDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString(),
      data: undefined,
      error,
    });
  }
};

module.exports = {
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
  createAdmin,
};
