var stockRepoFactory = require('./stock-repository-mock');
var assert = require('assert');

// var responseMock = {
//     lastJson : "",
//     json : function(data)
//     {
//         lastJson = data;
//     }
// }

describe('routes.findOne should', function() {

//   let stockRepo = stockRepoFactory();
//   let routes = require('../routes')(stockRepo);
//   stockRepo._items([ { isbn: "ABC", count: 10 }, { isbn: "XYZ", count: 20 } ]);

  it('should fire the next() when data not found', function(done) {
      // TBD
      done();
  });
  it('should return count when data found', function(done) {
      var stockRepository = {
          findOne: function(isbn) {
              assert.equal(isbn, "ABC");
              return Promise.resolve({ isbn: "ABC", count: 1});
          }
      }
      var req = {
          params: {
              isbn: "ABC"
          }
      }
      var res = {
          json: function(body) {
                assert.deepEqual(body, { count: 1 });
                done();
          }
      }
      var routes = require('../routes')(stockRepository);

      routes.findOne(req, res).catch(done);
  });
});