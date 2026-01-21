const db = require('../models');
const { Op } = require('sequelize');

/* CREATE TIMESHEET (EMPLOYEE) */
const createTimesheet = async (req, res) => {
  try {
    const { task_id, work_date, hours, remarks } = req.body;
    const userId = req.user.id;

    // hours > 0
    if (hours <= 0) {
      return res.status(400).json({ message: 'Hours must be greater than zero' });
    }

    // date not in future
    const today = new Date().toISOString().split('T')[0];
    if (work_date > today) {
      return res.status(400).json({ message: 'Work date cannot be in the future' });
    }

    // task must exist
    const task = await db.Task.findByPk(task_id, {
      include: db.Project
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // project must be ongoing
    if (task.Project.status !== 'ONGOING') {
      return res.status(400).json({ message: 'Project is not active' });
    }

    // task must be assigned to employee
    const assignment = await db.TaskAssignment.findOne({
      where: {
        task_id,
        user_id: userId
      }
    });

    if (!assignment) {
      return res.status(403).json({ message: 'Task not assigned to you' });
    }

    // prevent duplicate timesheet
    const existing = await db.Timesheet.findOne({
      where: {
        task_id,
        user_id: userId,
        work_date
      }
    });

    if (existing) {
      return res.status(400).json({
        message: 'Timesheet already exists for this task and date'
      });
    }

    const timesheet = await db.Timesheet.create({
      task_id,
      user_id: userId,
      work_date,
      hours,
      remarks
    });

    res.status(201).json({
      message: 'Timesheet created',
      timesheet
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/* GET TIMESHEETS (ROLE BASED) */
const getTimesheets = async (req, res) => {
  try {
    let condition = {};

    if (req.user.role === 'EMPLOYEE') {
      condition.user_id = req.user.id;
    }

    if (req.user.role === 'MANAGER') {
      const projects = await db.Project.findAll({
        where: { manager_id: req.user.id },
        attributes: ['id']
      });

      const projectIds = projects.map(p => p.id);

      const tasks = await db.Task.findAll({
        where: { project_id: projectIds },
        attributes: ['id']
      });

      const taskIds = tasks.map(t => t.id);

      condition.task_id = taskIds;
    }

    const timesheets = await db.Timesheet.findAll({
      where: condition,
      include: [
        db.Task,
        db.User
      ],
      order: [['work_date', 'DESC']]
    });

    res.json(timesheets);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createTimesheet,
  getTimesheets
};
