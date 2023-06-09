const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.users.controller')
const userExistenceMiddleware = require('../middlewares/api.checkUser.middleware')


router.get('/ping', controller.ping)

router.get('/', controller.getUsers)
router.post('/', controller.validateInput, userExistenceMiddleware.checkName, controller.postUser)

// TODO: Secure, input (name, token) checks and create middlewares (for checks and etc)
router.get('/name/:name', controller.getUserByName);
router.get('/token/:token', controller.getUserByToken);

router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)



module.exports = router;