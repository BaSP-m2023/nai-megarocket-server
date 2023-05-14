const SuperAdmin = require('../models/super-admins');

const getAllSuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => {
      if (superAdmins.length > 0) {
        res.status(200).json({
          message: 'Super Admins list: ',
          data: superAdmins,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Cannot find any Super Admin, please create one.',
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getSuperAdminsById = (req, res) => {
  const { id } = req.params;

  SuperAdmin.findById(id)
    .then((superAdmins) => {
      if (superAdmins !== null) {
        res.status(200).json({
          message: `Super Admin Found! ${superAdmins.firstName}`,
          data: superAdmins,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `Super Admin not found with this id: ${id}`,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const createSuperAdmins = (req, res) => {
  const { firstName, email, password } = req.body;

  SuperAdmin.findOne({ email })
    .then((existingSuperAdmin) => {
      if (existingSuperAdmin) {
        return res.status(400).json({
          message: 'Error!',
          error: 'This email exist in database for another Super Admin, please check.',
        });
      }

      return SuperAdmin.create({
        firstName,
        email,
        password,
      });
    })
    .then((result) => res.status(201).json({
      message: 'Super Admin Created!',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error!',
      error,
    }));
};

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
};
