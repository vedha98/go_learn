'use strict';
module.exports = (sequelize, DataTypes) => {
  const verifykeys = sequelize.define('verifykeys', {
    key: DataTypes.STRING,
    userId: DataTypes.STRING,
    expDate: DataTypes.DATE
  }, {});
  verifykeys.associate = function(models) {
   
  };
  return verifykeys;
};