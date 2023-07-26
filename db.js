// db.js

const { Sequelize } = require("sequelize");

// Replace 'your_database', 'your_username', 'your_password', and 'your_host' with your actual MySQL credentials
const sequelize = new Sequelize("backendnode", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
