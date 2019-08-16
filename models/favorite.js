'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };
  return Favorite;
};
