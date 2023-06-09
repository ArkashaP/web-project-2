const dbUsersService = require("../services/db.users.service");
class UserExistenceMiddleware{

    async checkName(req, res, next){ // Token required
        const {name} = req.body;
        await dbUsersService.findWithName('Users', name).then(result=> {

            const err = new Error("User already exists! (Name taken)")
            err.status = 409;
            next(err);
        }).catch(error=>{
            next();
        });

    }
}

module.exports = new UserExistenceMiddleware();