const dbUsersService = require("../services/db.users.service");
const dbModelsService = require("../services/db.models.service");
class ModelAccessMiddleware{

    async checkOwnerModel(req, res, next){ // Token required
        let nameFromUser;
        let nameFromModel;

        await dbUsersService.findWithToken('Users', req.header('api_key')).then(result=> {
            if(!result){
                const err = new Error("User not found! (Wrong api_key)")
                err.status = 401;
                next(err);
            } else {
                nameFromUser = result["name"]
            }
        }).catch(error=>{
            next(error);
        });

        const id = req.params.id;
        await dbModelsService.findOne('Models', id).then(result=> {
            if(!result){
                const err = new Error("Model not found! (Wrong id)")
                err.status = 404;
                next(err);
            } else {
                nameFromModel = result["name"]

            }
        }).catch(error=>{
            next(error);
        });

        if(nameFromUser == nameFromModel && nameFromUser != undefined){
            console.log('OK!')
            next()
        }else{
            console.log('ERR!')

            const error = new Error("403 Forbidden. (No access)")
            error.status = 403;
            next(error);
        }
    }
}

module.exports = new ModelAccessMiddleware();