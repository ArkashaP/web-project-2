const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.models.controller')


router.get('/ping', controller.ping)

router.get('/', controller.getUsers)



// Check if this req have token (if no -> error)
router.post('/', controller.postModel)

// TODO: Secure, input (name, token) checks and create middlewares (for checks and etc)



router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)


module.exports = router;