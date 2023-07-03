import Member from '../models/member';
import Trainer from '../models/trainer';
import Admin from '../models/admins';
import SuperAdmins from '../models/super-admins';

const getAuth = async (req, res) => {
  try {
    const member = await Member.findOne({ firebaseUid: req.headers.firebaseUid });
    if (member) {
      return res.status(201).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    }

    const trainer = await Trainer.findOne({ firebaseUid: req.headers.firebaseUid });
    if (trainer) {
      return res.status(201).json({
        message: 'Trainer found',
        data: trainer,
        error: false,
      });
    }

    const admin = await Admin.findOne({ firebaseUid: req.headers.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }

    const superAdmin = await SuperAdmins.findOne({ firebaseUid: req.headers.firebaseUid });
    if (superAdmin) {
      return res.status(201).json({
        message: 'Super Admin found',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default { getAuth };
