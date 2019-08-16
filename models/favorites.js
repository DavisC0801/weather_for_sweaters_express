'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('favorites', {
    location: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };
  return Favorites;
};
