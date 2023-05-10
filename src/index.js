import express from 'express';
import cors from 'cors';

const admins = require('./data/admins.json');
const adminRouter = require('./resources/admins');
const memberRouter = require('./resources/member');
const superAdminsRouter = require('./resources/super-admins');
const classRouter = require('./resources/class');
const trainerRouter = require('./resources/trainer');
const subsRouter = require('./resources/subscription');

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/admins', adminRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
app.use(adminRouter);
