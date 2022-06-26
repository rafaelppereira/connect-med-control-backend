const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  'deb6cm9vb003dl', 
  'tisczymnimheep', 
  'f4f651063fbd0fd0677d6798bd235cf7ab5504bfb905007f8bfbde1c4a22658c', 
  {
    dialect: 'postgres',
    host: 'ec2-3-224-8-189.compute-1.amazonaws.com',
    ssl: true,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
)

module.exports = sequelize;