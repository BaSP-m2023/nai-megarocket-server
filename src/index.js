import express from 'express';
import cors from 'cors';

const subsRouter = require('./resources/subscription');
const adminRouter = require('./resources/admins');
const memberRouter = require('./resources/member');
const superAdminsRouter = require('./resources/super-admins');
const classRouter = require('./resources/class');
const trainerRouter = require('./resources/trainer');
const activitiesRouter = require('./resources/activity');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/members', memberRouter);
app.use('/admins', adminRouter);
app.use('/superAdmins', superAdminsRouter);
app.use('/class', classRouter);
app.use('/trainer', trainerRouter);
app.use('/subscription', subsRouter);
app.use('/activities', activitiesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
app.use(adminRouter);
