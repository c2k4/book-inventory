var stockRepo = require('./stock-repository');
var app = require('./app')(stockRepo)

let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});