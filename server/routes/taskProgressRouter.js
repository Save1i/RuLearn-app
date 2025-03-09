const Router = require('express')
const router = new Router()
const taskProgressController = require('../controllers/taskProgressController')

router.post('/', taskProgressController.update)
router.get('/', taskProgressController.getAll)
router.get('/:id', taskProgressController.getOne)

module.exports = router