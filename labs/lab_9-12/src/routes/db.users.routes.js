const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.users.controller')
const userMiddleware = require('../middlewares/api.userCheck.middleware')


router.get('/ping', controller.ping) 

router.get('/', controller.getUsers)
router.post('/', controller.validateInput, userMiddleware.checkNameExistence, controller.postUser)

// TODO: Secure, input (name, token) checks and create middlewares (for checks and etc)
router.get('/name/:name', controller.getUserByName);
router.get('/token/:token', controller.getUserByToken);

router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)



module.exports = router;