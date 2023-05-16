const Subscription = require('../models/subscription');

const getAllSubscriptions = (req, res) => {
  Subscription.find()
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
  Subscription.findById(id).then((subscription) => res.status(200).json({
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
  const existingClass = await Subscription.findOne({ classes: req.body.classes });
  const existingDate = await Subscription.findOne({ date: req.body.date });
  const existingMember = await Subscription.findOne({ member: req.body.member });
  const { classes, member, date } = req.body;
  if ((existingDate) && (existingClass) && (existingMember)) {
    if (!(existingClass.id.toString()
    === existingDate.id.toString()
    === existingMember.id.toString())) {
      return res.status(400).json({
        message: 'Subscription already exists!',
        error: true,
      });
    }
  }
  return Subscription.create({
    classes,
    member,
    date,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred.',
      error,
    }));
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
};
