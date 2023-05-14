const Subscription = require('../models/subscription');

const applyResponse = (res, status, msg, data, error) => {
  res.status(status).json({
    msg,
    data,
    error,
  });
};

const updateSubscription = (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;
  Subscription.findById(id)
    .then((sub) => {
      const subObj = sub.toObject();
      const bodyObj = req.body;
      const areEquals = Object.entries(subObj).every(([key, value]) => {
        if (key !== 'date' && key !== '_id' && key !== '__v') {
          return (bodyObj[key] === value.toString());
        } if ((key === 'date' && key !== '_id' && key !== '__v')) {
          return (bodyObj[key] === value.toISOString().substring(0, 10));
        }
        return true;
      });
      if (areEquals) {
        return applyResponse(res, 400, 'Data in request body and in db instance are identical', undefined, true);
      }
      return Subscription.findOne({ classes, member, date })
        .then((subRepeated) => {
          if (subRepeated) {
            throw new Error('Subscription data already exists');
          }
          return Subscription.findByIdAndUpdate(
            id,
            {
              classes,
              member,
              date,
            },
            { new: true },
          );
        })
        .then((result) => {
          if (!result) {
            return applyResponse(res, 404, `Subscription with id: ${id} was not found`, undefined, true);
          }
          return applyResponse(res, 200, `Subscription with id: ${id} was updated successfully`, result, false);
        })
        .catch((error) => res.status(400).json({ msg: error.message, error: true }));
    });
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;
  Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (result === null) {
        return applyResponse(res, 404, `Subscription with id: ${id} was not found`, undefined, true);
      }
      return applyResponse(res, 200, `Subscription with id ${id} was deleted`, result, false);
    })
    .catch((error) => res.status(400).json({ msg: error.message, error: true }));
};

module.exports = { updateSubscription, deleteSubscription };
