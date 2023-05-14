const { default: mongoose } = require('mongoose');
const Admin = require('../models/admins');

const updateAdmin = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  return Admin.findByIdAndUpdate(
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
  )
    .then((adminUpdated) => {
      if (!adminUpdated) {
        return res.status(404).json({
          message: `Admin with the id (${id}) was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin updated',
        data: adminUpdated,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error,
    }));
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }
  return Admin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with ID (${id}) was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(204).json({});
    })
    .catch((error) => res.status(500).json({
      message: 'An error has ocurred',
      data: undefined,
      error,
    }));
};

module.exports = {
  updateAdmin,
  deleteAdmin,
};
