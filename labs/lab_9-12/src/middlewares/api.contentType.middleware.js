
class ContentTypeMiddleware{

    async check(req, res, next){
        const contype = req.headers['content-type'];
        if (!contype || contype.indexOf('application/json') !== 0){
            res.statusCode = 400;
            res.json('{status: "error", message: "Неверные данные"}');
        }else{
            next();
        }
    }
}

module.exports = new ContentTypeMiddleware();