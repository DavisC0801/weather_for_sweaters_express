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

  describe('api v1 favorites create path', () => {
    test('it should respond to a post request', () => {
      return request(app).post('/api/v1/favorites', (req, res) => {
        req.send(JSON.stringify({
          location: "Denver, CO",
          api_key: "12345",
        }))
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });
    });

    test('it should send a completion message if valid info is sent', () => {
      return request(app).post('/api/v1/favorites', (req, res) => {
        req.send(JSON.stringify({
          location: "Denver, CO",
          api_key: "12345",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('api_key')
        });
      });
    });

    test('it should send an error if invalid api key is sent', () => {
      return request(app).post('/api/v1/favorites', (req, res) => {
        req.send(JSON.stringify({
          location: "Denver, CO",
          api_key: "54321",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });

    test('it should send an error if invalid city info is sent', () => {
      return request(app).post('/api/v1/favorites', (req, res) => {
        req.send(JSON.stringify({
          location: "NotACityBecauseNoSpaceAndStateCode",
          api_key: "12345",
        }))
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });

    test('it should send an error if no data is sent', () => {
      return request(app).post('/api/v1/favorites', (req, res) => {
        req.send()
      .then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('error')
        });
      });
    });
  });
});
