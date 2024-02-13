import request from 'supertest';
import app from '../../server.js';
import { expect } from 'chai';

describe('Node Exporter Controller', function () {
  describe('GET /metrics', function () {
    it('should return a string which is the http stream', function (done) {
      request(app)
        .get('/nodeExporter/metrics')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.be.a('string');
          done();
        });
    });
  });

  describe('GET /memory', function () {
    it('should return an object', function (done) {
      request(app)
        .get('/nodeExporter/memory')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should contain perUsed property which is not null', function (done) {
      request(app)
        .get('/nodeExporter/memory')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('perUsed').that.is.not.null;
          done();
        });
    });
  });

  describe('GET /cpu', function () {
    it('should return an array', function (done) {
      request(app)
        .get('/nodeExporter/cpu')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('the returned array should have at least one element', function (done) {
      request(app)
        .get('/nodeExporter/cpu')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.lengthOf.above(0);
          done();
        });
    });

    it('should contain CPU_TotalCycles property which is not null', function (done) {
      request(app)
        .get('/nodeExporter/cpu')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body[0]).to.have.property('CPU_TotalCycles').that.is.not
            .null;
          done();
        });
    });
  });

  describe('GET /disk', function () {
    it('should return an object', function (done) {
      request(app)
        .get('/nodeExporter/disk')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should contain DISK_UsagePercent property which is not null', function (done) {
      request(app)
        .get('/nodeExporter/disk')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('DISK_UsagePercent').that.is.not
            .null;
          done();
        });
    });
  });
  
});
