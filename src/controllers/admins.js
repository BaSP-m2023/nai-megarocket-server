const { default: mongoose } = require('mongoose');
const Admin = require('../models/admins');

const updateAdmin = async (req, res) => {
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
      message: `Admin with the id (${id}) was not found.`,
      data: undefined,
      error: true,
    });
  }

  const adminProps = Object.keys(adminToUpdate.toObject()).slice(1, -3);
  let changes = false;
  adminProps.forEach((prop) => {
    if (req.body[prop] && req.body[prop] !== adminToUpdate[prop]) {
      changes = true;
    }
  });

  if (!changes) {
    return res.status(400).json({
      message: 'There is nothing to change',
      data: adminToUpdate,
      error: false,
    });
  }

  const anAdminAlreadyHas = await Admin.findOne({ $or: [{ dni }, { email }] });

  if (anAdminAlreadyHas) {
    return res.status(400).json({
      message: 'There is another admin with that data.',
      data: req.body,
      error: true,
    });
  }

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
    .then((adminUpdated) => res.status(200).json({
      message: 'Admin updated',
      data: adminUpdated,
      error: false,
    }))
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
    .then((adminDeleted) => {
      if (!adminDeleted) {
        return res.status(404).json({
          message: `Admin with ID (${id}) was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin deleted',
        data: adminDeleted,
        error: false,
      });
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
