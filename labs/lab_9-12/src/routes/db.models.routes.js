const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.models.controller')
const modelAccessMiddleware =  require('../middlewares/api.modelOwner.middleware')

router.get('/ping', controller.ping)

router.get('/', controller.getModels)



// Check if this req have token (if no -> error)
router.post('/', controller.postModel)

// TODO: Secure, input (name, token) checks and create middlewares (for checks and etc)
// router.use(modelAccessMiddleware.checkOwnerModel)
router.get('/:id', controller.getModel)

router.use('/:id', modelAccessMiddleware.checkOwnerModel)
router.put('/:id', controller.updateModel)
router.delete('/:id', controller.deleteModel)


module.exports = router;