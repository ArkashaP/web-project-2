// import {findAll, findOne, insert} from "../services/db.service"
const dbService = require('../services/db.comments.service')

let collectionName = 'Comments';
class ControllerDB{
    async ping(req, res){
        // res.send('Hello world!');
         res.send(dbService.showCollections());
    }
    async getComments(req, res, next) {
        dbService.findAll(collectionName).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            // TODO: Добавить обработчик ошибок
            next();
        });

    }

    async getComment(req, res,next) {
        const id = req.params.id;
        // const {id} = req.body;
        dbService.findOne(collectionName, id).then(result=>{
            res.json(result);
        }).catch(error=>{
            next();
            console.log(error);
        });

    }

    async postComment(req, res, next) {
        // const {comment, id} = req.body

        const {comment} = req.body;
        console.log(comment);
        dbService.insert(collectionName, req.body).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            next();
        });
    }
    async updateComment(req, res, next) {
        const id = req.params.id;
        dbService.update(collectionName, id, req.body).then(result=>{
            res.json(result);
        }).catch(error=>{
            console.log(error);
            next();
        });
    }
    async deleteComment(req, res, next) {
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