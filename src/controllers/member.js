const Member = require('../models/member');

const updateMember = (req, res) => {
  const { id } = req.params;
  const {
    firsName,
    lastName,
    dni,
    phone,
    email,
    password,
    city,
    birthDay,
    postalCode,
    isActive,
    membership,
  } = req.body;

  Member.findByIdAndUpdate(
    id,
    {
      firsName,
      lastName,
      dni,
      phone,
      email,
      password,
      city,
      birthDay,
      postalCode,
      isActive,
      membership,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `The member with id: ${id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `The member with id: ${id} was not found`,
        });
      }
      return res.status(204);
    })
    .catch((error) => res.status(400).json({
      message: 'Something went wrong! ',
      error,
    }));
};

module.exports = {
  updateMember,
  deleteMember,
};
