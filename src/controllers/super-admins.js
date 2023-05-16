const mongoose = require('mongoose');
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
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }

  return SuperAdmin.findById(id)
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
          error: 'This email is used by another super admin.',
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

const applyResponse = (res, status, msg, data, error) => {
  res.status(status).json({
    msg,
    data,
    error,
  });
};

const updateSuperAdmin = (req, res) => {
  const { id } = req.params;
  const { firstName, email, password } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  return SuperAdmin.findById(id)
    .then((superA) => {
      if (!superA) {
        return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
      }
      const superAObj = superA.toObject();
      const bodyObj = req.body;
      const isEqual = Object.entries(bodyObj).every(([key]) => {
        if (key !== '_id' && key !== '__v') {
          return (bodyObj[key] === superAObj[key]);
        }
        return true;
      });
      if (isEqual) {
        return applyResponse(res, 404, 'Update rejected. ReqBody is identical for that id instance', undefined, true);
      }
      return SuperAdmin.findOne({ email })
        .then((repeatedMail) => {
          if ((repeatedMail)
          && (Object.values(repeatedMail.toObject())[0].toString() !== id)) {
            return applyResponse(res, 404, 'Email already exists', undefined, true);
          }
          return SuperAdmin.findByIdAndUpdate(
            id,
            {
              firstName,
              email,
              password,
            },
            { new: true },
          )
            .then((result) => applyResponse(
              res,
              200,
              `Super Admin ${result.firstName} was updated successfully`,
              result,
              false,
            ));
        });
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  return SuperAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
      }
      return applyResponse(res, 200, `Super Admin ${result.firstName} was deleted`, result, false);
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
  updateSuperAdmin,
  deleteSuperAdmin,
};
