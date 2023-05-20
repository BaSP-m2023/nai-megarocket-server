import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6465666a0c73f4c8d3d7c4b0'),
    classes: new mongoose.Types.ObjectId('645e93e1a752d93f86251679'),
    member: new mongoose.Types.ObjectId('645e92fbbe5d7274768a3125'),
    date: new Date(2000, 10, 2),
  },
  {
    _id: new mongoose.Types.ObjectId('6465666a0c73f4c8d3d7c4b1'),
    classes: new mongoose.Types.ObjectId('645e93e1a752d93f86251680'),
    member: new mongoose.Types.ObjectId('645e92fbbe5d7274768a3126'),
    date: new Date(2001, 11, 3),
  },
  {
    _id: new mongoose.Types.ObjectId('6465666a0c73f4c8d3d7c4b2'),
    classes: new mongoose.Types.ObjectId('645e93e1a752d93f86251681'),
    member: new mongoose.Types.ObjectId('645e92fbbe5d7274768a3127'),
    date: new Date(2002, 12, 4),
  },
];
