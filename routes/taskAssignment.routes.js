const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const {
  assignTask
} = require('../controllers/taskAssignment.controller');

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  assignTask
);

module.exports = router;
