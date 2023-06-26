import firebaseApp from '../helper/firebase';

const verifyAdminMember = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'Provide a Token',
      data: undefined,
      error: true,
    });
  }
  try {
    const response = await firebaseApp.auth().verifyIdToken(token);
    req.headers.firebaseUid = response.user_id;

    const admin = 'ADMIN';
    const member = 'MEMBER';

    if ((response.role !== admin) && (response.role !== member)) {
      return res.status(400).json({
        message: 'You dont have access',
        data: undefined,
        error: true,
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default { verifyAdminMember };
