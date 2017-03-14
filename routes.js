module.exports = function(stockRepo)
{
    var stockRepo = stockRepo;
    
    return {
        helloWorld : function(req, res) {
            res.send('Hello World!');
        },

        findAll : function(req, res, next) {
            stockRepo.findAll().then(function(result) {
                res.json(result);
            }).catch(next);
        },

        findOne : function(req, res, next) {
            // return to improve testability (unit tests)
            return stockRepo.findOne(req.params.isbn).then(function(result) {
                if (result != null) {
                    res.json({count: result.count});
                }
                else next();
            }).catch(next);
        },

        stockUp : function (req, res, next) {
            stockRepo.stockUp(req.body.isbn, req.body.count).then(function() {
                res.json({isbn: req.body.isbn});
            }).catch(next)
        },

        throwError : function(req, res, next) {
            throw "error";
        }
    }
}