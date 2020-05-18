'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    AccountNo: DataTypes.STRING,
    userId: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    IsPrimary: DataTypes.BOOLEAN,
    AccountType:DataTypes.STRING
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};