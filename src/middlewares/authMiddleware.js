import firebaseApp from '../helper/firebase';

const authMiddleware = (accessRoles) => async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token || typeof token !== 'string') {
      throw new Error('Token is required');
    }
    const response = await firebaseApp.auth().verifyIdToken(token);
    const firebaseUser = await firebaseApp.auth().getUser(response.uid);
    const role = firebaseUser.customClaims?.role;

    if (!role) {
      throw new Error('No credentials found');
    }
    if (!(accessRoles.includes(role))) {
      throw new Error('Credentials not authorized to access this information');
    }
    req.headers.firebaseUid = response.uid;
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};

export default authMiddleware;
