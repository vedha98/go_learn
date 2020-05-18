'use strict';
module.exports = (sequelize, DataTypes) => {
  const otpkeys = sequelize.define('otpkeys', {
    key: DataTypes.STRING,
    userId: DataTypes.STRING,
    expDate: DataTypes.DATE
  }, {});
  otpkeys.associate = function(models) {
    // associations can be defined here
  };
  return otpkeys;
};