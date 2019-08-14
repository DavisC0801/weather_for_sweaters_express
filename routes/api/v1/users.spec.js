const shell = require('shelljs');
const request = require("supertest");
const app = require('../../../app.js');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });

  beforeEach(() => {
    jest.setTimeout(1000);
    shell.exec('npx sequelize db:migrate');
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  afterAll(() => {
    shell.exec('npx sequelize db:drop');
  })

  describe('api v1 users create path', () => {
    test('it should respond to a post request', () => {
      return request(app).post('/api/v1/users', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "password",
          password_confirmation: "password"
        }))
        .then(response => {
          expect(response.statusCode).toBe(201);
        });
      });
    });

    test('it should send an API key if valid info is sent', () => {
      return request(app).post('/api/v1/users', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "password",
          password_confirmation: "password"
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('api_key')
        });
      });
    });

    test('it should send an error if invalid info is sent', () => {
      return request(app).post('/api/v1/users', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "password",
          password_confirmation: "notmypassword"
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });
  });
});
