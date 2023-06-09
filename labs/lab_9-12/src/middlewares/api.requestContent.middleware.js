
class RequestContentMiddleware{

    async checkContentType(req, res, next){
        const contype = req.headers['content-type'];
        if (!contype || contype.indexOf('application/json') !== 0){
            res.statusCode = 400;
            res.json('{status: "error", message: "Неверные данные"}');
        }else{
            next();
        }
    }
    async checkApiKey(req, res, next){
        // check if is undefined
        if(req.header('api_key') === undefined) {
            const err = new Error;
            err.message = 'api_key is required!';
            next(err);
        }else{
            next();
        }
    }
}

module.exports = new RequestContentMiddleware();