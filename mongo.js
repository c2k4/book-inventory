var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-inventory';

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  insertDocuments(db, function() {
    db.close();
  });
});