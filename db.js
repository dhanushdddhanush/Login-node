const { Sequelize } = require('sequelize');

// DB name: users, table name: users
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/users', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
