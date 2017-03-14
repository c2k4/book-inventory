module.exports = function()
{
    return {
        logger : function (req, res, next) {
            console.log("Request at ", new Date());
            next();
        },

        clientError : function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        },

        serverError : function(err, req, res, next) {
            console.error(err.stack);
            var status = err.status || 500;
            res.status(status).send('Oh no: ' + status);
        }
    }
}