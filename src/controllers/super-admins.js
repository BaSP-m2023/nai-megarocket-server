const mongoose = require('mongoose');
const SuperAdmin = require('../models/super-admins');

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();
    if (superAdmins.length > 0) {
      res.status(200).json({
        message: 'Super Admins list',
        data: superAdmins,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'Cannot find any Super Admin, please create one.',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error ocurred', error });
  }
};

const getSuperAdminsById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The ID is not valid',
      data: id,
      error: true,
    });
  }

  try {
    const superAdmins = await SuperAdmin.findById(id);
    if (superAdmins) {
      return res.status(200).json({
        message: 'Super Admin Found!',
        data: superAdmins,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super Admin was not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred', data: undefined, error });
  }
};

const createSuperAdmins = async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const existingSuperAdmin = await SuperAdmin.findOne({ email });

    if (existingSuperAdmin) {
      return res.status(400).json({
        message: 'This email is already used.',
        error: true,
      });
    }

    const result = await SuperAdmin.create({
      firstName,
      email,
      password,
    });

    return res.status(201).json({
      message: 'Super Admin was succesfully created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Super Admin couldn\'t be created',
      error: true,
    });
  }
};

const applyResponse = (res, status, message, data, error) => {
  res.status(status).json({
    message,
    data,
    error,
  });
};

const updateSuperAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName, email, password } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  try {
    const noChanges = await SuperAdmin.findOne({ firstName, email, password });

    if (noChanges) {
      return applyResponse(res, 400, 'There is nothing to change', undefined, true);
    }

    const repeatedMail = await SuperAdmin.findOne({ email });
    if (repeatedMail && Object.values(repeatedMail.toObject())[0].toString() !== id) {
      return applyResponse(res, 404, 'This Super Admin already exists', undefined, true);
    }
    const result = await SuperAdmin.findByIdAndUpdate(
      id,
      {
        firstName,
        email,
        password,
      },
      { new: true },
    );
    if (result) {
      return applyResponse(
        res,
        200,
        `Super Admin ${result.firstName} was successfully updated`,
        result,
        false,
      );
    } return applyResponse(res, 404, 'Super Admin not found', undefined, true);
  } catch (error) {
    return applyResponse(res, 500, error.message, undefined, true);
  }
};

const deleteSuperAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  try {
    const result = await SuperAdmin.findByIdAndDelete(id);
    if (!result) {
      return applyResponse(res, 404, 'Super Admin was not found', undefined, true);
    }
    return applyResponse(res, 200, `Super Admin ${result.firstName} was successfully deleted`, result, false);
  } catch (error) {
    return applyResponse(res, 500, error.message, undefined, true);
  }
};

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
  updateSuperAdmin,
  deleteSuperAdmin,
};
