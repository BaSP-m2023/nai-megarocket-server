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
    hour: '24:07',
    trainer: new mongoose.Types.ObjectId('646a3278743738c22171407f'),
    activity: new mongoose.Types.ObjectId('646a3278743738c22171408a'),
    slots: 20,
  },
  {
    _id: new mongoose.Types.ObjectId('646a353ecdc4cb3be6be10b5'),
    day: ['Monday'],
    hour: '17:00',
    trainer: new mongoose.Types.ObjectId('646428fc0b6aa64a90624a21'),
    activity: new mongoose.Types.ObjectId('6465095739daaa5e7a21031a'),
    slots: 7,
  },
  {
    _id: new mongoose.Types.ObjectId('646a353ecdc4cb3be6be10a7'),
    day: ['Wednesday'],
    hour: '17:00',
    trainer: new mongoose.Types.ObjectId('646428fc0b6aa64a90624c05'),
    activity: new mongoose.Types.ObjectId('6465095739daaa5e7a21051a'),
    slots: 3,
  },
  {
    _id: new mongoose.Types.ObjectId('646a353ecdc4cb3be6be10c3'),
    day: ['Friday'],
    hour: '17:00',
    trainer: new mongoose.Types.ObjectId('646428fc0b6aa64a90624b07'),
    activity: new mongoose.Types.ObjectId('6465095739daaa5e7a21041a'),
    slots: 5,
  },
];
