var stockRepo = require('./stock-repository-mock')();
var app = require('../app')(stockRepo);
var request = require('supertest');

describe('GET /stock/isbn', function() {
  stockRepo._items([ { isbn: "ABC", count: 10 }, { isbn: "XYZ", count: 20 } ]);

  it('return the stock count', function(done) {
    request(app)
      .get('/stock/ABC')
      .expect(200, { count: 10 }, done);
  });
  it('return 404 for unknown isbn', function(done) {
    request(app)
      .get('/stock/ABCDE')
      .expect(404, done);
  });
});

describe('GET /error', function() {
  it('respond with 500', function(done) {
    request(app)
      .get('/error')
      .expect(500, done);
  });
});

describe('GET /kukuryku', function() {
  it('respond with 404', function(done) {
    request(app)
      .get('/kukuryku')
      .expect(404, done);
  });
});

describe('GET /', function() {
  it('respond with Hello World!', function(done) {
    request(app)
      .get('/')
      .expect('Hello World!', done);
  });
});

describe('POST /stock', function() {
  it('respond with json', function(done) {
    request(app)
      .post('/stock')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('return the isbn', function(done) {
    request(app)
      .post('/stock')
      .send({ isbn: "ABC", count: 10})
      .expect(200, { isbn: "ABC"}, done);
  });
});