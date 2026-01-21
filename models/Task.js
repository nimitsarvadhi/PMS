module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: DataTypes.TEXT,
    estimated_hours: DataTypes.DECIMAL(6,2),
    status: {
      type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
      allowNull: false
    }
  }, {
    tableName: 'tasks',
    underscored: true
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Project, { foreignKey: 'project_id' });
    Task.hasMany(models.TaskAssignment, { foreignKey: 'task_id' });
    Task.hasMany(models.Timesheet, { foreignKey: 'task_id' });
  };

  return Task;
};
