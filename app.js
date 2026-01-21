const express = require('express');
const app = express();

// 🔹 Routes
const authRoutes = require('./routes/auth.routes');

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Mount routes
app.use('/auth', authRoutes);
app.use('/users', require('./routes/user.routes'));
app.use('/projects', require('./routes/project.routes'));
app.use('/tasks', require('./routes/task.routes'));
app.use('/task-assignments', require('./routes/taskAssignment.routes'));
app.use('/timesheets', require('./routes/timesheet.routes'));
app.use('/reports', require('./routes/report.routes'));



// 🔹 Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
