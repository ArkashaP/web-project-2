// import {findAll, findOne, insert} from "../services/db.service"
const dbService = require('../services/db.models.service')
const dbUsersService = require('../services/db.users.service')
const keyGen = require('rand-token')
let collectionName='Models';
class ControllerDB{
    async ping(req, res){
        // res.send('Hello world!');
         res.send('Its a Models route')
    }

    async postModel(req, res, next) {
        // const {comment, id} = req.
        let name;
        await dbUsersService.findWithToken('Users', req.header('api_key')).then(result=>{
            name = result['name']
        }).catch(error=>{
            console.log(error);
            next(error);
        });

        const {model_name, type_of_model, object_model, description, comments} = req.body;
        const creation_date = new Date();
        const modified_date = new Date();

        const result = {
            name,
            model_name,
            type_of_model,
            object_model,
            description,
            comments,
            creation_date,
            modified_date
        }

        dbService.insert(collectionName, result).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            next();
        });
    }
    async getModels(req, res, next) {
        dbService.findAll(collectionName).then(result=>{
            if(result.length == 0) {
                const err = new Error('No models found! (DB is empty)');
                // TODO: Status code!
                next(err)
            } else{
                res.json(result);
            }
        }).catch(error=>{
            console.log(error);
            next(error);
        });

    }


    async getModel(req, res, next) {
        // TODO: Владелец видит всю инфу
        const id = req.params.id;
        dbService.findOne(collectionName, id).then(result=>{
            if(!result){
                const err = new Error('Model not found! (Wrong id)');
                err.status = 404; // TODO: Status!
                next(err);
            }else{
                res.json(result);
            }
        }).catch(error=>{
            next(error);
            console.log(error);
        });

    }
    async updateModel(req, res, next) {
        const id = req.params.id;

        const modified_date = new Date(); // Update date
        
        // {
        //     name,
        //     model_name,
        //     type_of_model,
        //     object_model,
        //     description,
        //     comments,
        //     creation_date,
        //     modified_date
        // } // TODO: Do checks for these keys
        const result = Object.assign({}, req.body, {modified_date}); 
        dbService.update(collectionName, id, result).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            next();
        });
    }
    async deleteModel(req, res, next) {
            const id = req.params.id;
            dbService.delete(collectionName, id).then(result=>{
                res.json(result);
            }).catch(error=>{
                console.log(error);
                next();
            });
        }


}
module.exports = new ControllerDB();