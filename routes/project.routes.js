const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const {
  createProject,
  getProjects
} = require('../controllers/project.controller');

router.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  createProject
);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  getProjects
);

module.exports = router;
