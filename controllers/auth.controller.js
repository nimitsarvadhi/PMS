const db = require('../models');
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({
      where: { email },
      include: db.Role
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'Password not set for user' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user.id,
      role: user.Role.name
    });

    res.json({
      token,
      role: user.Role.name
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
