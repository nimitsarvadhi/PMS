const db = require('../models');
const { QueryTypes } = require('sequelize');
const { getPagination } = require('../utils/pagination');

/* ===============================
   PROJECT COST REPORT (PAGINATED)
   =============================== */
const projectCostReport = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { limit: l, offset } = getPagination(page, limit);

    const data = await db.sequelize.query(
      `
      SELECT
        p.id AS project_id,
        p.name AS project_name,
        SUM(t.hours * u.hourly_rate) AS total_cost
      FROM projects p
      JOIN tasks tk ON tk.project_id = p.id
      JOIN timesheets t ON t.task_id = tk.id
      JOIN users u ON u.id = t.user_id
      GROUP BY p.id, p.name
      ORDER BY p.name
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit: l, offset },
        type: QueryTypes.SELECT
      }
    );

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Project cost report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* ===============================
   EMPLOYEE HOURS REPORT (PAGINATED)
   =============================== */
const employeeHoursReport = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { limit: l, offset } = getPagination(page, limit);

    const data = await db.sequelize.query(
      `
      SELECT
        u.id AS user_id,
        u.name AS employee_name,
        SUM(t.hours) AS total_hours
      FROM users u
      JOIN timesheets t ON t.user_id = u.id
      GROUP BY u.id, u.name
      ORDER BY u.name
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit: l, offset },
        type: QueryTypes.SELECT
      }
    );

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Employee hours report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* ===============================
   TASK EFFORT REPORT (PAGINATED)
   =============================== */
const taskEffortReport = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { limit: l, offset } = getPagination(page, limit);

    const data = await db.sequelize.query(
      `
      SELECT
        tk.id AS task_id,
        tk.title AS task_title,
        SUM(t.hours) AS total_hours
      FROM tasks tk
      JOIN timesheets t ON t.task_id = tk.id
      GROUP BY tk.id, tk.title
      ORDER BY tk.title
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit: l, offset },
        type: QueryTypes.SELECT
      }
    );

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Task effort report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* ===============================
   MONTHLY SUMMARY REPORT (PAGINATED)
   =============================== */
const monthlySummaryReport = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { limit: l, offset } = getPagination(page, limit);

    const data = await db.sequelize.query(
      `
      SELECT
        DATE_TRUNC('month', work_date) AS month,
        SUM(hours) AS total_hours
      FROM timesheets
      GROUP BY month
      ORDER BY month DESC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: { limit: l, offset },
        type: QueryTypes.SELECT
      }
    );

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Monthly summary report error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* ===============================
   EXPORTS
   =============================== */
module.exports = {
  projectCostReport,
  employeeHoursReport,
  taskEffortReport,
  monthlySummaryReport
};
