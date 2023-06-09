const Router = require('express');
const router = new Router();
const controller = require('../controllers/db.models.controller')
const modelAccessMiddleware =  require('../middlewares/api.modelOwner.middleware')
const reqContentMiddleware = require('../middlewares/api.requestContent.middleware')
const userCheckMiddleware = require('../middlewares/api.userCheck.middleware')

router.get('/ping', controller.ping)
// Read

router.get('/', controller.getModels)
router.get('/:id', controller.getModel)

// Create
router.use(reqContentMiddleware.checkApiKey) // Correct input (api_key)?
router.use(userCheckMiddleware.checkApiKeyExistence) // User exists?
router.post('/', controller.postModel)

// Change\Delete
router.use('/:id', modelAccessMiddleware.checkOwnerModel) // Is this the owner?
router.put('/:id', controller.updateModel)
router.delete('/:id', controller.deleteModel)


module.exports = router;