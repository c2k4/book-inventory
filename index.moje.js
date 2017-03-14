var express = require('express');
var app = express();

app.use(function (req, res, next) {
  console.log('Request @ ' + new Date());
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/error', function (req, res) {
  throw 500;
});

app.post('/stock', function (req, res) {
  res.send('Przeslano ksiazke: ' + req.isbn)
}) //curl -H "Content-Type: application/json" -X POST -d '{"isbn":"1617291781","count":10}' http://localhost:3000/stock

app.use(function (req, res, next) {
  next(404);
})

app.use(function (err, req, res, next) {
  res.status(err || 500).send('This is: ' + err || 500);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// GET /stock/1617291781 zwraca JSON
// {"count": 10}
