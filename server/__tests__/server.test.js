import request from 'supertest';
import app from '../server.js';

describe('Server Initialization', function () {
  it('root should send a 200 response on the correct port', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('should send a 404 response when requesting invalid path', function (done) {
    request(app)
      .get('/notarealpath')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
