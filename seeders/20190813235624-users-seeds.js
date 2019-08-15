'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'test@test.com',
      password: '$2b$10$beL6aXbGq8..THbAGDYB5.IQJsKkEI0MwmsOYi7TTt0pJwd2zSHq.',
      apiKey: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'user@user.com',
      password: '$2b$10$beL6aXbGq8..THbAGDYB5.IQJsKkEI0MwmsOYi7TTt0pJwd2zSHq.',
      apiKey: "23456",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'admin@admin.com',
      password: '$2b$10$beL6aXbGq8..THbAGDYB5.IQJsKkEI0MwmsOYi7TTt0pJwd2zSHq.',
      apiKey: "34567",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
