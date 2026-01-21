const Sequelize = require('sequelize');
const sequelize = require('../config/Database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Role = require('./Role')(sequelize, Sequelize.DataTypes);
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Project = require('./Project')(sequelize, Sequelize.DataTypes);
db.Task = require('./Task')(sequelize, Sequelize.DataTypes);
db.TaskAssignment = require('./TaskAssignment')(sequelize, Sequelize.DataTypes);
db.Timesheet = require('./Timesheet')(sequelize, Sequelize.DataTypes);

/* Call associations */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
