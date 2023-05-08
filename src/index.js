// use 'import' to import libraries
import express from 'express';
import cors from 'cors';

// use 'require' to import JSON files
const admins = require('./data/admins.json');

// use 'require' to import routers
const adminRouter = require('./resources/admins');
const memberRouter = require('./resources/member');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/members', memberRouter);
app.use('/admins', adminRouter);

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
