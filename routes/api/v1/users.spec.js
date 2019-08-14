const shell = require('shelljs');
const request = require("supertest");
const app = require('../../../app.js');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  describe('api v1 users create path', () => {
    test('it should respond to a post request', () => {
      return request(app).post('/api/v1/users').then(response => {
        expect(response.statusCode).toBe(201);
      });
    });
  });
});
