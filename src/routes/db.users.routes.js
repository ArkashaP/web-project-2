const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.users.controller')


router.get('/ping', controller.ping)

router.get('/', controller.getUsers)
router.post('/', controller.postUser)

router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)



module.exports = router;