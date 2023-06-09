class ErrorsMiddleware{
    async error(err, req, res, next){
        if(res.headersSent){
            return;
        }
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        })
    }
    async authError(err, req, res, next){ // No api_key sent
        res.status(err.status || 401);

        res.render('error', {
            message: err.message,
            error: {}
        });
    }
}
module.exports = new ErrorsMiddleware();