module.exports = function(stockRepo)
{
    var express = require('express');
    var mw = require('./middleware')();
    var r = require('./routes')(stockRepo);
    var bodyParser = require('body-parser');

    var app = express();

    app.use(bodyParser.json());

    app.get('/', mw.logger, r.helloWorld);
    app.get('/stock', mw.logger, r.findAll);
    app.get('/stock/:isbn', mw.logger, r.findOne);
    app.post('/stock', r.stockUp) //curl -H "Content-Type: application/json" -X POST -d "{\"isbn\":\"xyz\",\"count\":\"10\"}" http://localhost:3000/stock
    app.get('/error', r.throwError);

    app.use(mw.clientError);
    app.use(mw.serverError);

    return app;
} 