import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization denied: Token missing or format invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pandit_infra_secret_token_key_987654321');
    const user = await User.findById(decoded.id || decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Authorization denied: User not found' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Authorization denied: Your account is blocked by the administrator' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed: Token is invalid or expired' });
  }
};
export default verifyAdmin;
