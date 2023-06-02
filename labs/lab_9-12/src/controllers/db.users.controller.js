// import {findAll, findOne, insert} from "../services/db.service"
const dbService = require('../services/db.users.service')
const keyGen = require('rand-token')
let collectionName='Users';
class ControllerDB{


    async ping(req, res){
        // res.send('Hello world!');
         res.send('Its a Users route')
    }

    async validateInput(req,res,next){
        const {name} = req.body
        if(name == undefined || name == ''){
            return res.status(400).json({ error: 'Invalid input' })
        }
        else{
            next()
        }
    }

    async getUserByName(req, res, next){
        const name = req.params.name;
        // const {name} = req.body;
        dbService.findWithName(collectionName, name).then((result=>{
            res.json(result);
        })).catch(error=>{
            console.log(error);
            next();
        });
    }
    async getUserByToken(req, res, next){
        const token = req.params.token;
        dbService.findWithToken(collectionName, token).then((result=>{
            res.json(result);
        })).catch(error=>{
            console.log(error);
            next();
        });
    }

    async postUser(req, res, next) {

        // const {comment, id} = req.body
        // TODO: Check if this name exists
        const {name} = req.body;
        const token = keyGen.generate(32);
        console.log({name, token});
        dbService.insert(collectionName, {name, token}).then(result=>{
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