const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const { createTask } = require('../controllers/task.controller');

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  createTask
);

module.exports = router;
