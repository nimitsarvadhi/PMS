// const express = require('express');
// const router = express.Router();

// const authenticate = require('../middlewares/auth.middleware');
// const authorize = require('../middlewares/role.middleware');
// const {
//   createTimesheet
// } = require('../controllers/timesheet.controller');

// router.post(
//   '/',
//   authenticate,
//   authorize(['EMPLOYEE']),
//   createTimesheet
// );

// module.exports = router;

const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const {
  createTimesheet,
  getTimesheets
} = require('../controllers/timesheet.controller');

/* CREATE TIMESHEET (EMPLOYEE ONLY) */
router.post(
  '/',
  authenticate,
  authorize(['EMPLOYEE']),
  createTimesheet
);

/* GET TIMESHEETS (ADMIN / MANAGER / EMPLOYEE) */
router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'MANAGER', 'EMPLOYEE']),
  getTimesheets
);

module.exports = router;



