const db = require('../models');

/* CREATE TASK */
const createTask = async (req, res) => {
  try {
    const { project_id, title, description, estimated_hours } = req.body;

    const project = await db.Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Manager can only create tasks for own project
    if (
      req.user.role === 'MANAGER' &&
      project.manager_id !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const task = await db.Task.create({
      project_id,
      title,
      description,
      estimated_hours,
      status: 'TODO'
    });

    res.status(201).json({
      message: 'Task created',
      task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createTask
};
