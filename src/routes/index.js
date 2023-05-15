const express = require('express');

const router = express.Router();

// const subscriptions = require('./subscription');
// const admins = require('./admins');
const members = require('./member');
// const superAdmins = require('./super-admins');
// const classes = require('./class');
const trainers = require('./trainer');
const activities = require('./activity');

router.use('/members', members);
// router.use('/admins', admins);
// router.use('/super-admins', superAdmins);
// router.use('/classes', classes);
router.use('/trainers', trainers);
// router.use('/subscriptions', subscriptions);
router.use('/activities', activities);

module.exports = router;
