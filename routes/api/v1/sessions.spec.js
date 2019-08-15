const shell = require('shelljs');
const request = require("supertest");
const app = require('../../../app.js');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  afterAll(() => {
    shell.exec('npx sequelize db:drop');
  })

  describe('api v1 sessions create path', () => {
    test('it should respond to a post request', () => {
      return request(app).post('/api/v1/sessions', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "password",
        }))
        .then(response => {
          expect(response.statusCode).toBe(201);
        });
      });
    });

    test('it should send an API key if valid info is sent', () => {
      return request(app).post('/api/v1/sessions', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "password",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('api_key')
        });
      });
    });

    test('it should send an error if invalid email is sent', () => {
      return request(app).post('/api/v1/sessions', (req, res) => {
        req.send(JSON.stringify({
          email: "notmytest@test.com",
          password: "password",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });

    test('it should send an error if invalid password is sent', () => {
      return request(app).post('/api/v1/sessions', (req, res) => {
        req.send(JSON.stringify({
          email: "test@test.com",
          password: "notmypassword",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });

    test('it should send an error if no data is sent', () => {
      return request(app).post('/api/v1/sessions', (req, res) => {
        req.send()
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });
  });
});
