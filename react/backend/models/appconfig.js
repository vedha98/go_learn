'use strict';
module.exports = (sequelize, DataTypes) => {
  const appconfig = sequelize.define('appconfig', {
    config: DataTypes.STRING,
    arch: DataTypes.STRING,
    value: DataTypes.BOOLEAN
  }, {});
  appconfig.associate = function(models) {
    // associations can be defined here
  };
  return appconfig;
};