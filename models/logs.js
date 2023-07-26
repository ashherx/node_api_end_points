// Logs.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Logs = sequelize.define("Logs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});



module.exports = Logs;
