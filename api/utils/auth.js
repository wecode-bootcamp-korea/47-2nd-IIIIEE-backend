import jwt from 'jsonwebtoken';
import { userDao } from '../models/index.js';

const loginRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'TOKEN_NOT_FOUND' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userDao.getUserById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }

    req.user = user;

    next();
  } catch {
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }
};

export { loginRequired };
