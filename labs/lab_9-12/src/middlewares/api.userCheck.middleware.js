const dbUsersService = require("../services/db.users.service");
class UserExistenceMiddleware{

    async checkNameExistence(req, res, next){ // Name required
        const {name} = req.body;
        await dbUsersService.findWithName('Users', name).then(result=> {
            console.log(result);
            if(!result){
                next();
            }else{
                const err = new Error("User already exists! (Name taken)")
                err.status = 409;
                next(err);
            }
        }).catch(error=>{
            next(error);
        });
        
    };
    async checkApiKeyExistence(req, res, next){ // Token required
        await dbUsersService.findWithToken('Users', req.header('api_key')).then(result=> {
            if(!result){
                const err = new Error("User not found! (Wrong api_key)")
                err.status = 401;
                next(err);
            }else{
                next()
            }
        }).catch(error=>{
            next(error);
        });
    };
}

module.exports = new UserExistenceMiddleware();