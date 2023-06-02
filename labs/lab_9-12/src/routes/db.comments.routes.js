const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.comments.controller')


router.get('/ping', controller.ping)

router.get('/', controller.getComments)
router.post('/', controller.postComment)

router.get('/:id', controller.getComment)
router.put('/:id', controller.updateComment)
router.delete('/:id', controller.deleteComment)



module.exports = router;