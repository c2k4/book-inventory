var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-inventory';
var collection = MongoClient.connect(url, { bufferMaxEntries: 0 }).then(function(db) {
    return db.collection('books');
}).catch(function(err) {
    console.error(err);
    process.exit(1);
});

function stockUp(isbn, count)
{
    return collection.then(function(c) {
        return c.updateOne({ isbn: isbn }, { isbn: isbn, count: count }, {upsert: true});
    })
}

function findAll()
{
    return collection.then(function(c) {
        return c.find({}).toArray();
    })
}

function findOne(isbn)
{
    return collection.then(function(c) {
        return c.find({"isbn": isbn}).limit(1).next();
    })
}

module.exports = { findAll : findAll, stockUp : stockUp, findOne: findOne };