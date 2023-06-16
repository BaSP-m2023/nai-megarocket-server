const { default: mongoose } = require('mongoose');
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

  try {
    const alreadyExists = await Admin.findOne({ $or: [{ dni }, { email }] });

    if (alreadyExists) {
      return res.status(400).json({
        message: 'This admin already exists',
        data: undefined,
        error: true,
      });
    }

    const adminCreated = await Admin.create({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
    });

    return res.status(201).json({
      message: 'Admin was successfully created',
      data: adminCreated,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error has occurred',
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
      password,
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
      firstName, lastName, dni, phone, email, city, password,
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
        password,
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

    const adminDeleted = await Admin.findByIdAndDelete(id);

    if (!adminDeleted) {
      return res.status(404).json({
        message: 'Admin was not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Admin ${adminDeleted.firstName} ${adminDeleted.lastName} was successfully deleted`,
      data: adminDeleted,
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

module.exports = {
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
  createAdmin,
};
