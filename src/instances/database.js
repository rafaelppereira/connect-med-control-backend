const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  'd6gsmr4e19pkgs', 
  'qzisttuylfpubh', 
  '4f5b33526572a9b81701b6d6a31bbaa08fef6a40b4459e7936e85781060159d1', 
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