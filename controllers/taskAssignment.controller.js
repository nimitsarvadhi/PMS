const db = require('../models');

/* ASSIGN TASK TO EMPLOYEE */
const assignTask = async (req, res) => {
  try {
    const { task_id, user_id } = req.body;

    const task = await db.Task.findByPk(task_id, {
      include: db.Project
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Manager can assign only for own project
    if (
      req.user.role === 'MANAGER' &&
      task.Project.manager_id !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const user = await db.User.findByPk(user_id, {
      include: db.Role
    });

    if (!user || user.Role.name !== 'EMPLOYEE') {
      return res.status(400).json({ message: 'Invalid employee' });
    }

    const assignment = await db.TaskAssignment.create({
      task_id,
      user_id
    });

    res.status(201).json({
      message: 'Task assigned',
      assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  assignTask
};
