const Router = require('express')
const router = new Router()
const sectionController = require('../controllers/sectionController')

router.post('/', sectionController.create)
router.get('/', sectionController.getAll)
router.get('/:id', sectionController.getOne)

module.exports = router