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
      let propsEqual = true;
      for (let i = 1; i < Object.entries(sub.toJSON()).length - 1; i += 1) {
        const subObj = sub.toJSON();
        if (!(Object.keys(subObj)[i].toString() === 'date')) {
          if (Object.values(subObj)[i].toString() !== Object.values(req.body)[i - 1]) {
            propsEqual = false;
            break;
          }
        } else if (Object.values(subObj)[i].toISOString()
          .substring(0, 10) !== Object.values(req.body)[i - 1]) {
          propsEqual = false;
          break;
        }
      }
      if (propsEqual) {
        return applyResponse(res, 404, 'No changes were made. Body data is already in the db', undefined, true);
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
