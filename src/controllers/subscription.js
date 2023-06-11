const mongoose = require('mongoose');
const Subscription = require('../models/subscription');

const getAllSubscriptions = (req, res) => {
  Subscription.find()
    .populate({
      path: 'classes',
      select: 'activity day',
      populate: {
        path: 'activity',
        select: 'name',
      },
    })
    .populate('member')
    .then((subscriptions) => {
      if (subscriptions.length === 0) {
        return res.status(404).json({
          message: 'There are not subscriptions yet',
          data: subscriptions,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Subscriptions list.',
        data: subscriptions,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error has ocurred',
      error,
    }));
};

const getSubscriptionById = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'The ID is invalid',
      data: id,
      error: true,
    });
  }
  return Subscription.findById(id)
    .populate({
      path: 'classes',
      select: 'activity day',
      populate: {
        path: 'activity',
        select: 'name',
      },
    })
    .populate('member')
    .then((subscription) => {
      if (!subscription) {
        return res.status(404).json({
          message: 'Subscription not found',
          data: subscription,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Subscription found: ${subscription.id}`,
        data: subscription,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error has ocurred',
      error,
    }));
};

const createSubscription = async (req, res) => {
  const { classes, member, date } = req.body;
  const existingSubscription = await Subscription.findOne({
    classes,
    member,
  });
  if (existingSubscription) {
    return res.status(400).json({
      message: 'Subscription already exists',
      error: true,
    });
  }
  return Subscription.create({
    classes,
    member,
    date,
  })
    .then((result) => res.status(201).json({
      message: 'Subscription succesfully created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred.',
      error,
    }));
};

const applyResponse = (res, status, message, data, error) => {
  res.status(status).json({
    message,
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
        return applyResponse(
          res,
          404,
          'Subscription was not found',
          undefined,
          true,
        );
      }
      return Subscription.findOne({ classes, member, date })
        .then((subRepeated) => {
          if (subRepeated) {
            return applyResponse(
              res,
              400,
              'This member is already subscribed to this class',
              subRepeated,
              true,
            );
          }
          return Subscription.findByIdAndUpdate(
            id,
            {
              classes,
              member,
              date,
            },
            { new: true },
          ).then((result) => applyResponse(
            res,
            200,
            'Subscription was successfully updated',
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
    return applyResponse(res, 400, 'Subscription was not found', id, true);
  }
  return Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return applyResponse(
          res,
          404,
          'Subscription was not found',
          undefined,
          true,
        );
      }
      return applyResponse(
        res,
        200,
        'Subscription was succesfully deleted',
        result,
        false,
      );
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
