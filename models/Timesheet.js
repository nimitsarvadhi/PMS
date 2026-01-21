module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define('Timesheet', {
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hours: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    remarks: DataTypes.TEXT
  }, {
    tableName: 'timesheets',
    underscored: true,
    indexes: [
      { unique: true, fields: ['user_id', 'task_id', 'work_date'] }
    ]
  });

  Timesheet.associate = (models) => {
    Timesheet.belongsTo(models.User, { foreignKey: 'user_id' });
    Timesheet.belongsTo(models.Task, { foreignKey: 'task_id' });
  };

  return Timesheet;
};
