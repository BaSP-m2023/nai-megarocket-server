import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('646a3278743738c22171407a'),
    day: ['Tuesday', 'Monday'],
    hour: '23:07',
    trainer: new mongoose.Types.ObjectId('646a3278743738c22171407b'),
    activity: new mongoose.Types.ObjectId('646a3278743738c22171407c'),
    slots: 20,
  },
  {
    _id: new mongoose.Types.ObjectId('646a3278743738c22171407e'),
    day: ['Tuesday', 'Monday'],
    hour: '23:07',
    trainer: new mongoose.Types.ObjectId('646a3278743738c22171407f'),
    activity: new mongoose.Types.ObjectId('646a3278743738c22171408a'),
    slots: 20,
  },
];
