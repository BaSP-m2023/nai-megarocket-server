const express = require('express');

const router = express.Router();

// const subscriptions = require('../controllers/subscription');
// const admins = require('../controllers/admins');
// const members = require('../controllers/member');
// const superAdmins = require('../controllers/super-admins');
const classes = require('./class');
// const trainers = require('../controllers/trainer');
// const activities = require('../controllers/activity');
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
router.use('/classes', classes);
// router.use('/trainers', trainers);
// router.use('/classes', classes);
router.use('/trainers', trainers);
// router.use('/subscriptions', subscriptions);
router.use('/activities', activities);

module.exports = router;
