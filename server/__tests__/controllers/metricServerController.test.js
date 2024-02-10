import request from 'supertest';
import app from '../../server.js';
import { expect } from 'chai';

describe('Metric Server Controller', function () {
  describe('GET /metricserver/pods', function () {
    it('should return an array of pods with status 200', function (done) {
      request(app)
        .get('/metricserver/pods')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
