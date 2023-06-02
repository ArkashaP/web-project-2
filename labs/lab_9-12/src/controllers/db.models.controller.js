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
        // const {comment, id} = req.body
        // TODO: Check if this name exists
        const name = await dbUsersService.findWithToken('Users', req.header('api_key')).catch(error=>{
            console.log(error);
            next();
        });
        console.log(name)

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
    async getUsers(req, res, next) {
        dbService.findAll(collectionName).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            // TODO: Добавить обработчик ошибок
            next();
        });

    }

    async getUser(req, res,next) {
        const id = req.params.id;
        // const {id} = req.body;
        dbService.findOne(collectionName, id).then(result=>{
            res.json(result);
        }).catch(error=>{
            next();
            console.log(error);
        });

    }
    async updateUser(req, res, next) {
        const id = req.params.id;
        dbService.update(collectionName, id, req.body).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            next();
        });
    }
    async deleteUser(req, res, next) {
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