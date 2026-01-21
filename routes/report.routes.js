const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const {
  projectCostReport,
  employeeHoursReport,
  taskEffortReport,
  monthlySummaryReport
} = require('../controllers/report.controller');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reporting and analytics APIs
 */

/**
 * @swagger
 * /reports/project-cost:
 *   get:
 *     summary: Get project cost report
 *     description: Returns total cost per project calculated from timesheets and employee hourly rates.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Project cost report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/project-cost',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  projectCostReport
);

/**
 * @swagger
 * /reports/employee-hours:
 *   get:
 *     summary: Get employee work hours report
 *     description: Returns total hours worked by each employee using timesheet data.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Employee work hours report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/employee-hours',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  employeeHoursReport
);

/**
 * @swagger
 * /reports/task-effort:
 *   get:
 *     summary: Get task effort report
 *     description: Returns total hours spent on each task based on timesheet entries.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Task effort report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/task-effort',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  taskEffortReport
);

/**
 * @swagger
 * /reports/monthly-summary:
 *   get:
 *     summary: Get monthly summary report
 *     description: Returns total hours worked per month using timesheet data.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Monthly summary report
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get(
  '/monthly-summary',
  authenticate,
  authorize(['ADMIN', 'MANAGER']),
  monthlySummaryReport
);

module.exports = router;
