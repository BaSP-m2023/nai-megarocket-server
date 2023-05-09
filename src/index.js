// use 'import' to import libraries
import express from 'express';
import cors from 'cors';

const admins = require('./data/admins.json');
const memberRouter = require('./resources/member');
const superAdminsRouter = require('./resources/super-admins');

// Routes
const activities = require('./resources/activity');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/members', memberRouter);
app.use('/superAdmins', superAdminsRouter);

app.use('/api/activities', activities);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
