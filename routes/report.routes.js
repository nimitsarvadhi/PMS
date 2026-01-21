const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const { projectCostReport, employeeHoursReport, taskEffortReport, monthlySummaryReport} = require('../controllers/report.controller');

router.get(
  '/project-cost',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  projectCostReport
);
router.get(
  '/employee-hours',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  employeeHoursReport
);

router.get(
  '/task-effort',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  taskEffortReport
);

router.get(
  '/monthly-summary',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  monthlySummaryReport
);

module.exports = router;
