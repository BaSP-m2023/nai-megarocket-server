const { default: mongoose } = require('mongoose');
const Admin = require('../models/admins');

const getAllAdmins = (req, res) => {
  Admin.find()
    .then((adminsList) => {
      if (adminsList.length === 0) {
        return res.status(404).json({
          message: 'There are not admins yet',
          data: adminsList,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admins list obtained',
        data: adminsList,
        error: false,
      });
    })
    .catch((err) => res.status(500).json({
      message: 'An error has ocurred',
      err,
      error: true,
    }));
};

const getAdminById = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }
  return Admin.findById(id)
    .then((adminToSend) => {
      if (!adminToSend) {
        return res.status(404).json({
          message: `Admin with id (${id}) was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin found',
        data: adminToSend,
        error: false,
      });
    })
    .catch((err) => res.status(500).json({
      message: 'An error has ocurred',
      err,
      error: true,
    }));
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
  const alreadyExists = await Admin.findOne({ $or: [{ dni }, { email }] });
  if (alreadyExists) {
    return res.status(400).json({
      message: 'It already exists another admin with that Dni or Email',
      data: req.body,
      error: true,
    });
  }
  return Admin.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((adminCreated) => res.status(201).json({
      message: 'Admin created',
      data: adminCreated,
      error: false,
    }))
    .catch((err) => res.status(500).json({
      message: 'An error has ocurred',
      err,
      error: true,
    }));
};

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
  getAllAdmins,
  getAdminById,
  createAdmin,
};
