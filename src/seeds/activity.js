import mongoose from 'mongoose';

export default [
  {
    _id:new mongoose.Types.objectId('64677fdefc13ae39f1753b24'),
    name:'Artemus',
    desciption:'vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis',
    isActive: false
  },
  {
    _id: new mongoose.Types.objectId('64677fdefc13ae39f1753b25'),
    name: 'Nisse',
    desciption: 'interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae',
    isActive: true
  },
  {
    _id: new mongoose.Types.objectId('64677fdefc13ae39f1753b26'),
    name: 'Chandal',
    desciption: 'quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in',
    isActive: false
  },
  {
    _id: new mongoose.Types.objectId('64677fdefc13ae39f1753b27'),
    name: 'Nerita',
    desciption: 'odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est',
    isActive: true
  },
  {
    _id: new mongoose.Types.objectId('64677fdefc13ae39f1753b28'),
    name: 'Tracee',
    desciption: 'potenti in eleifend quam a odio',
    isActive: true
  }
];