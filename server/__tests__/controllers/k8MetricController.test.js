import request from 'supertest';
import app from '../../server.js';
import { expect } from 'chai';

describe('K8 Metric Controller', function () {
  describe('GET /pods', function () {
    it('should return a list of pods with status 200', function (done) {
      request(app)
        .get('/pods')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
