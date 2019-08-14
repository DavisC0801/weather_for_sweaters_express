'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      validate: {
        unique: true,
        isEmail: true,
        allowNull: false
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    apiKey: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
