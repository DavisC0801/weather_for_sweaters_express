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

  describe('api v1 forecast create path', () => {
    test('it should respond to a post request', () => {
      return request(app).get('/api/v1/forecast?location=denver,co', (req, res) => {
        req.send(JSON.stringify({
          api_key: "12345",
        }))
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });
    });

    test('it should send an forecast if valid api key is sent', () => {
      return request(app).get('/api/v1/forecast?location=denver,co', (req, res) => {
        req.send(JSON.stringify({
          api_key: "12345",
        }))
      .then(response => {
        expect(response.body.length).toEqual(4),
        expect(Object.keys(response.body[0])).toContain('location')
        expect(Object.keys(response.body[0])).toContain('currently')
        expect(Object.keys(response.body[0])).toContain('hourly')
        expect(Object.keys(response.body[0])).toContain('daily')
        });
      });
    });

    test('it should send an error if invalid api key is sent', () => {
      return request(app).get('/api/v1/forecast?location=denver,co', (req, res) => {
        req.send(JSON.stringify({
          api_key: "54321",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });
  });
});
