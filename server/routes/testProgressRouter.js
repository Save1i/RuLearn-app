const Router = require('express')
const router = new Router()
const testProgressController = require('../controllers/testProgressController')

router.post('/', testProgressController.update)
router.get('/', testProgressController.getAll)
router.get('/:id', testProgressController.getOne)

module.exports = router