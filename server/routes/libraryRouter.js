const Router = require('express')
const router = new Router()
const libraryController = require('../controllers/libraryController')

router.post('/', libraryController.create)
router.get('/', libraryController.getAll)
router.get('/user', libraryController.getOne)
router.delete('/', libraryController.deleteOne)

module.exports = router