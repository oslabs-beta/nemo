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

  describe('GET /metricserver/namespaces', function () {
    it('should return an array of namespaces with status 200', function (done) {
      request(app)
        .get('/metricserver/namespaces')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /metricserver/services', function () {
    it('should return an array of services with status 200', function (done) {
      request(app)
        .get('/metricserver/services')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /metricserver/ingresses', function () {
    it('should return an array of ingresses with status 200', function (done) {
      request(app)
        .get('/metricserver/ingresses')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
