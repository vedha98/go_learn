'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccountTypes = sequelize.define('AccountTypes', {
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    minbal: DataTypes.STRING
  }, {});
  AccountTypes.associate = function(models) {
    // associations can be defined here
  };
  return AccountTypes;
};