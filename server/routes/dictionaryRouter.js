const Router = require('express')
const router = new Router()
const dictionaryController = require('../controllers/dictionaryController')

router.post('/', dictionaryController.create)
router.get('/', dictionaryController.getAll)
router.get('/words', dictionaryController.getOne)

module.exports = router