const app = require('./app');
const db = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('DB NAME:', JSON.stringify(process.env.DB_NAME));

    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
})();
