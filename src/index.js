import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
// eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected'))
// eslint-disable-next-line no-console
  .catch((err) => console.log('Error', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

try {
  app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`server listening on port: ${process.env.PORT}`);
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('There was an error starting the server: ', err);
}
