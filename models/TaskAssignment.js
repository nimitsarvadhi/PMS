module.exports = (sequelize, DataTypes) => {
  const TaskAssignment = sequelize.define('TaskAssignment', {}, {
    tableName: 'task_assignments',
    timestamps: false,
    underscored: true
  });

  TaskAssignment.associate = (models) => {
    TaskAssignment.belongsTo(models.Task, { foreignKey: 'task_id' });
    TaskAssignment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return TaskAssignment;
};
