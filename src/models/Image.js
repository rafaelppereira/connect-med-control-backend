const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const database = require('../instances/database');

const Images = database.define('Image', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'images',
  timestamps: false,
});

module.exports = Images; 