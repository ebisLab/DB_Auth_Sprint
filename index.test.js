const request = require('supertest');

const server = require('./api/server.js');

describe('server.js', () => {
    describe('GET /', () => {
        it('returns 200 OK', () => {
            // make a GET request to the / endpoint on the server
            return request(server)
                .get('/')
                .then(res => {
                    // assert that we get an http status code 200
                    expect(res.status).toBe(200);
                });
        });

        it('returns JSON', done => {
            request(server)
                .get('/')
                .then(res => {
                    // assert that we get an http status code 200
                    expect(res.type).toMatch(/json/i);
                    done();
                });
        });
    });
});
