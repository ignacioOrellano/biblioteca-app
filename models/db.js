const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'biblioteca_db',
  'root',
  'admin',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
