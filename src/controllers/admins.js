const admin = require('../models/admins');

const getAllAdmins = (req,res) =>{
  admin.find()
  .then(("admins") => {
    return res.status(200).json({
        message: 'List of admins',
        data : 'admins',
        error: false,
    });
  })
  .catch((error)=> {
    return res.status(500).json({
        message : 'an error ocurred',
        error,
    });
  });
};
