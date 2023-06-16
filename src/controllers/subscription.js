const mongoose = require('mongoose');
const Subscription = require('../models/subscription');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate({
        path: 'classes',
        select: 'activity day',
        populate: {
          path: 'activity',
          select: 'name',
        },
      })
      .populate('member');
    if (subscriptions.length === 0) {
      return res.status(404).json({
        message: 'There are no subscriptions yet',
        data: subscriptions,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscriptions list.',
      data: subscriptions,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};

const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'The ID is invalid',
      data: id,
      error: true,
    });
  }

  try {
    const subscription = await Subscription.findById(id)
      .populate({
        path: 'classes',
        select: 'activity day',
        populate: {
          path: 'activity',
          select: 'name',
        },
      })
      .populate('member');

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
  } catch (error) {
    return res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};

const createSubscription = async (req, res) => {
  const { classes, member, date } = req.body;

  try {
    const existingSubscription = await Subscription.findOne({ classes, member });

    if (existingSubscription) {
      return res.status(400).json({
        message: 'Subscription already exists',
        error: true,
      });
    }

    const result = await Subscription.create({ classes, member, date });

    return res.status(201).json({
      message: 'Subscription successfully created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error,
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

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return applyResponse(res, 400, 'Id is invalid', id, true);
    }

    const sub = await Subscription.findById(id);

    if (!sub) {
      return applyResponse(res, 404, 'Subscription was not found', undefined, true);
    }

    const noChanges = await Subscription.findOne({ classes, member, date });

    if (noChanges) {
      return applyResponse(
        res,
        400,
        'There is nothing to change',
        undefined,
        true,
      );
    }

    const alreadySub = await Subscription.findOne({ classes, member });

    if (alreadySub) {
      return applyResponse(
        res,
        400,
        'This member is already subscribed to this class',
        undefined,
        true,
      );
    }

    const subUpdate = await Subscription.findByIdAndUpdate(
      id,
      { classes, member, date },
      { new: true },
    );

    return applyResponse(res, 200, 'Subscription was successfully updated', subUpdate, false);
  } catch (error) {
    return applyResponse(res, 500, error.message, undefined, true);
  }
};

const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return applyResponse(res, 400, 'Subscription was not found', id, true);
    }

    const deleteSub = await Subscription.findByIdAndDelete(id);

    if (!deleteSub) {
      return applyResponse(res, 404, 'Subscription was not found', undefined, true);
    }

    return applyResponse(res, 200, 'Subscription was succesfully deleted', deleteSub, false);
  } catch (error) {
    return applyResponse(res, 500, error.message, undefined, true);
  }
};

module.exports = {
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
};
