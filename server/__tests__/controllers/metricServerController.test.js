import request from 'supertest';
import app from '../../server.js';
import { expect } from 'chai';

describe('Metric Server Controller', function () {
  //endpoint is now topPods, update below test
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

  //endpoint is now topNodes, update below test
  describe('GET /metricserver/nodes', function () {
    it('should return an array of nodes with status 200', function (done) {
      request(app)
        .get('/metricserver/nodes')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
