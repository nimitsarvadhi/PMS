const { verifyToken } = require('../utils/jwt');
const db = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await db.User.findByPk(decoded.id, {
      include: db.Role
    });

    if (!user || !user.is_active) {
      return res.status(403).json({ message: 'User inactive or not found' });
    }

    req.user = {
      id: user.id,
      role: user.Role.name
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
