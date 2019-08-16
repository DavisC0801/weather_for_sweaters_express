'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    location: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  favorites.associate = function(models) {
  Favorites.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };
  return favorites;
};
