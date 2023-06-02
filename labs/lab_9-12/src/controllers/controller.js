const service = require('../services/service')
let comments = ['Comment 1', 'Comment 2', 'Comment 3 ...'];
class Controller{


    async ping(req, res){
        res.send('Hello world!');
    }
    async getComments(req, res) {

        res.send(comments);
    }
    async validateInput(req,res,next){
        const {comment} = req.body
        if(comment == undefined || comment == ''){
            return res.status(400).json({ error: 'Invalid input' })
        }
        else{
            next()
        }
    }
    async postComment(req, res) {
        // const {comment, id} = req.body

        const {comment} = req.body
        comments.push(comment)
        res.json(comments)
    }
    async getStats(req, res) {
        res.setHeader('Content-Type', 'text/html')
        res.send(service.generateHTMLTable());
    }
}
module.exports = new Controller();