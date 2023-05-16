const mongoose = require('mongoose');
const Admin = require('../models/admins');

const getAllAdmins = (req, res) => {
  Admin.find()
    .then((admins) => {
      if (admins.length === 0) {
        return res.status(404).json({
          message: 'There is no admins',
          error: false,
        });
      }
      return res.status(200).json({
        message: 'Complete admins list',
        data: admins,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};
const getAdminById = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Invalid admin id: ${id}`,
      error: true,
    });
  }
  return Admin.findById(id)
    .then((admin) => {
      if (admin == null) {
        return res.status(404).json({
          message: `There are no admin with id: ${id}`,
          data: admin,
          error: false,
        });
      }
      return res.status(200).json({
        message: `Admin with id: ${id}`,
        data: admin,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};
const createNewAdmin = async (req, res) => {
  const existingDni = await Admin.findOne({ dni: req.body.dni });
  const existingEmail = await Admin.findOne({ email: req.body.email });
  if (existingDni) {
    return res.status(409).json({
      message: 'This admin already exists',
      error: true,
    });
  }
  if (existingEmail) {
    return res.status(409).json({
      message: 'This admin already exists',
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
  return Admin.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((result) => res.status(201).json({
      message: 'New admin added correctly',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};
module.exports = {
  getAllAdmins,
  getAdminById,
  createNewAdmin,
};
