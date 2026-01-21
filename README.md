# Smart Project Work Management System (PMS)

## 📌 Overview
The PMS backend helps organizations manage projects, tasks, employees, and track work using timesheets.  
All reports and cost calculations are derived from timesheet data.

---

## 🧰 Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Swagger (OpenAPI)

---

## 🏗️ Architecture
- Controller–Service–Route pattern
- Role-Based Access Control (RBAC)
- Timesheet as single source of truth
- SQL-based reporting

---

## 👥 User Roles
| Role | Permissions |
|----|----|
| Admin | Full access |
| Manager | Project & task control |
| Employee | Log work |

---

## 🔐 Authentication
- JWT-based authentication
- Role enforced at backend
- Inactive users blocked

---

## 📦 Modules
- User Management
- Project Management
- Task Management
- Task Assignment
- Timesheet Management
- Reports & Analytics

---

## 📊 Reports
- Project Cost Report
- Employee Work Hours Report
- Task Effort Report
- Monthly Summary Report

All reports use SQL aggregation over timesheets.

---

## 🔢 Pagination
Reports support pagination via:
