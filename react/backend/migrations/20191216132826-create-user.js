'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true
    }, 
    firstname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    aadharNo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    panNo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    everified:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    pverified:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    averified:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    refferal:{
        type:Sequelize.STRING,
        allowNull:false
    },
    refferedcode:{
        type:Sequelize.STRING
    },
    dob:{
        type:Sequelize.DATE,
        allowNull:false
    },
    nfirstname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    nlastname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ndob:{
        type:Sequelize.DATE,
        allowNull:false
        
    },
    image:{
        type:Sequelize.STRING,
        allowNull:true

    },

    createdAt:{
        type:Sequelize.DATE
    },
    updatedAt:{
        type:Sequelize.DATE
    },
    deletedAt:{
      type:Sequelize.DATE
    },
    tokenlogin:{
        type:Sequelize.BOOLEAN
    },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};