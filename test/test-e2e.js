var stockRepoFactory = require('./stock-repository-mock');
var appFactory = require('../app');
var request = require('supertest');

describe("Book repository", function() {
  it ('returns the stock count', function(done) {
    let stockRepo = stockRepoFactory();
    let app = appFactory(stockRepo);
    stockRepo._items([ { isbn: "ABC", count: 10 }, { isbn: "XYZ", count: 20 } ]);

    request(app)
      .get('/stock/ABC')
      .expect(200, { count: 10 }, done);
  });
});