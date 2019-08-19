'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Favorites', [{
      location: 'Denver, CO',
      latitude: "39.742043",
      longitude: "-104.991531",
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      location: 'Boulder, CO',
      latitude: "40.014984",
      longitude: "105.270546",
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favorites', null, {});

  }
};
