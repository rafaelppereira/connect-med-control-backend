const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const database = require('../instances/database');

const User = database.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User; 