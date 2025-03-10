const Router = require('express')
const router = new Router()
const sectionController = require('../controllers/sectionController')
const checkRole = require("../middleware/chekRoleMiddleware")

router.post('/',checkRole('ADMIN'), sectionController.create)
router.get('/', sectionController.getAll)
router.get('/:id', sectionController.getOne)

module.exports = router