const SuperAdmin = require('../models/super-admins');

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
  SuperAdmin.findById(id)
    .then((superA) => {
      const superAObj = superA.toObject();
      const bodyObj = req.body;
      const isEqual = Object.entries(superAObj).every(([key]) => {
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
          if ((repeatedMail !== null)
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
            .then((result) => {
              if (!result) {
                return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
              }
              return applyResponse(res, 200, `Super Admin ${result.firstName} was updated successfully`, result, false);
            })
            .catch((error) => res.status(400).json({ msg: error.message, error: true }));
        });
    });
};

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;
  SuperAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (result === null) {
        return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
      }
      return applyResponse(res, 200, `Super Admin ${result.firstName} was deleted`, result, false);
    })
    .catch((error) => res.status(400).json({ msg: error.message, error: true }));
};

module.exports = { updateSuperAdmin, deleteSuperAdmin };
