'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', {
      email: 'user1@1.com',
      password: 'password'
    },{
      email: 'user2@2.com',
      password: 'password2'
    },{
      email: 'user3@3.com',
      password: 'password3'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
