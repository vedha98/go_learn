
const Sequelize = require('sequelize');
module.exports = new Sequelize('bank', 'postgres', 'password', {
  host: 'localhost',
  dialect:'postgres'
});