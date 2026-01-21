module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: DataTypes.TEXT,
    budget: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ONGOING', 'COMPLETED'),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: DataTypes.DATEONLY
  }, {
    tableName: 'projects',
    underscored: true
  });

  Project.associate = (models) => {
    Project.belongsTo(models.User, { foreignKey: 'manager_id' });
    Project.hasMany(models.Task, { foreignKey: 'project_id' });
  };

  return Project;
};
