'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    fromid: DataTypes.STRING,
    toid: DataTypes.STRING,
    fromno: DataTypes.STRING,
    tono: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};