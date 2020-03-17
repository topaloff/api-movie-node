'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};