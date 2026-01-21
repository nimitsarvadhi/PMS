const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const {
  createUser,
  updateUserStatus
} = require('../controllers/user.controller');

router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  createUser
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['ADMIN']),
  updateUserStatus
);

module.exports = router;
