const express = require('express');

const router = express.Router();

const classes = require('./class');
const subscriptions = require('./subscription');
const admins = require('./admins');
const members = require('./member');
const superAdmins = require('./super-admins');
const trainer = require('./trainer');
const activities = require('./activity');
const auth = require('./auth');

router.use('/classes', classes);
router.use('/auth', auth);
router.use('/members', members);
router.use('/admins', admins);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);
router.use('/trainers', trainer);
router.use('/activities', activities);

module.exports = router;
