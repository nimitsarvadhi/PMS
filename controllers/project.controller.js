const db = require('../models');

/* CREATE PROJECT (ADMIN) */
const createProject = async (req, res) => {
  const {
    name,
    description,
    budget,
    manager_id,
    start_date,
    end_date
  } = req.body;

  const manager = await db.User.findByPk(manager_id);
  if (!manager || manager.role_id !== 2) {
    return res.status(400).json({ message: 'Invalid manager' });
  }

  const project = await db.Project.create({
    name,
    description,
    budget,
    status: 'ONGOING',
    manager_id,
    start_date,
    end_date
  });

  res.status(201).json({ message: 'Project created', project });
};

/* GET PROJECTS (ADMIN / MANAGER) */
const getProjects = async (req, res) => {
  const condition =
    req.user.role === 'MANAGER'
      ? { manager_id: req.user.id }
      : {};

  const projects = await db.Project.findAll({ where: condition });
  res.json(projects);
};

module.exports = {
  createProject,
  getProjects
};
