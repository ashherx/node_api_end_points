// User.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Logs = require('../models/logs.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    defaultValue: 'active'
  },
});


module.exports = User;
