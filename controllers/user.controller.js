const db = require('../models');
const { hashPassword } = require('../utils/password');

/* CREATE USER (ADMIN) */
const createUser = async (req, res) => {
  const { name, email, password, role_id, hourly_rate } = req.body;

  const existing = await db.User.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashed = await hashPassword(password);

  const user = await db.User.create({
    name,
    email,
    password: hashed,
    role_id,
    hourly_rate
  });

  res.status(201).json({ message: 'User created', user });
};

/* ACTIVATE / DEACTIVATE USER */
const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  const user = await db.User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.is_active = is_active;
  await user.save();

  res.json({ message: 'User status updated' });
};

module.exports = {
  createUser,
  updateUserStatus
};
