const Subscription = require('../models/subscription');

const updateSubscription = (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;
  Subscription.findByIdAndUpdate(
    id,
    {
      classes,
      member,
      date,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Subscription with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json(error));
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;

  Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          msg: `Subscription with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(204).json({
        msg: `Subscription with id ${id} was deleted`,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({ msg: error, error: true }));
};

const createActivities = (req, res) => {
  const { classes, member, date } = req.body;
  Subscription.create({ classes, member, date })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

module.exports = { updateSubscription, deleteSubscription, createActivities };
