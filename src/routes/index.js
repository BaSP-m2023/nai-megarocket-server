const express = require('express');

const router = express.Router();

const subs = require('../controllers/subscription');
const admin = require('../controllers/admins');
const member = require('../controllers/member');
const superAdmin = require('../controllers/super-admins');
const classes = require('../controllers/class');
const trainer = require('../controllers/trainer');
const activity = require('../controllers/activity');

router.use('/members', member);
router.use('/admins', admin);
router.use('/superAdmins', superAdmin);
router.use('/class', classes);
router.use('/trainer', trainer);
router.use('/subscription', subs);
router.use('/activities', activity);

module.exports = router;
