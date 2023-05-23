const mongoose = require('mongoose');
const Subscription = require('../models/subscription');

const getAllSubscriptions = (req, res) => {
  Subscription.find().populate('classes').populate('member')
    .then((subscription) => res.status(200).json({
      message: 'Complete subscription list.',
      data: subscription,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'Subscription not found.',
      error,
    }));
};

const getSubscriptionById = (req, res) => {
  const { id } = req.params;
  Subscription.findById(id).populate('classes').populate('member')
    .then((subscription) => res.status(200).json({
      message: `Subscription found: ${subscription.id}`,
      data: subscription,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'Subscription not found.',
      error,
    }));
};

const createSubscription = async (req, res) => {
  const { classes, member, date } = req.body;
  const existingSubscription = await Subscription.findOne({ classes, member, date });
  if (existingSubscription) {
    return res.status(400).json({
      message: 'Subscription already exists!',
      error: true,
    });
  }
  return Subscription.create({
    classes,
    member,
    date,
  })
    .then((result) => res.status(201).json({
      message: 'Subscription created succesfully',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred.',
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

const updateSubscription = (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 400, 'Id is invalid', id, true);
  }
  return Subscription.findById(id)
    .then((sub) => {
      if (!sub) {
        return applyResponse(res, 404, `Subscription with id: ${id} not found`, undefined, true);
      }
      const subObj = sub.toObject();
      const bodyObj = req.body;
      const areEquals = Object.entries(bodyObj).every(([key]) => {
        if (key !== 'date' && key !== '_id' && key !== '__v') {
          return (bodyObj[key] === subObj[key].toString());
        } if ((key === 'date' && key !== '_id' && key !== '__v')) {
          return (bodyObj[key] === subObj[key].toISOString().substring(0, 10));
        }
        return true;
      });
      if (areEquals) {
        return applyResponse(res, 400, 'Data in request body and in db instance are identical', sub, true);
      }
      return Subscription.findOne({ classes, member, date })
        .then((subRepeated) => {
          if (subRepeated) {
            return applyResponse(res, 400, 'Subscription data already exists', subRepeated, true);
          }
          return Subscription.findByIdAndUpdate(
            id,
            {
              classes,
              member,
              date,
            },
            { new: true },
          )
            .then((result) => applyResponse(
              res,
              200,
              `Subscription with id: ${id} was updated successfully`,
              result,
              false,
            ));
        })
        .catch((error) => applyResponse(res, 500, error.message, undefined, true));
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 400, 'Id is invalid', id, true);
  }
  return Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return applyResponse(res, 404, `Subscription with id: ${id} was not found`, undefined, true);
      }
      return applyResponse(res, 200, `Subscription with id ${id} was deleted`, result, false);
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

module.exports = {
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
};
