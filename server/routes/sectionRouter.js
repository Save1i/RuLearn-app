const Router = require('express')
const router = new Router()
const sectionController = require('../controllers/sectionController')
const checkRole = require("../middleware/chekRoleMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',checkRole('ADMIN'), sectionController.create)
router.get('/', authMiddleware, sectionController.getAll)
router.get('/:id', authMiddleware, sectionController.getOne)

module.exports = router