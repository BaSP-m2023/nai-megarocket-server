import express from 'express';
import cors from 'cors';

const mongoose = require('mongoose');
const router = require('./routes');

const DB_URL = 'mongodb+srv://nai-team:PgpbRyhiB3ct4zVR@megarocket-databases.inpprte.mongodb.net/nai-database';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
mongoose.connect(DB_URL)
// eslint-disable-next-line no-console
  .then(() => console.log('CONNECTED DB'))
// eslint-disable-next-line no-console
  .catch((error) => console.log('Error: ', error));
app.use('/api', router);

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
