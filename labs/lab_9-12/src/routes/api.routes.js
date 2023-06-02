const Router = require('express');
const router = new Router();
const controller = require('../controllers/controller')


router.get('/', controller.ping)
router.get('/comments', controller.getComments)
router.post('/comments', controller.validateInput, controller.postComment)
router.get('/stats', controller.getStats)


module.exports = router;


