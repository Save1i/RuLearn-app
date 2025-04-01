const Router = require('express')
const router = new Router()
const sectionController = require('../controllers/sectionController')
const checkRole = require("../middleware/chekRoleMiddleware")
const authMiddleware = require("../middleware/AuthMiddleware");

router.post('/', sectionController.create) // add checkRole('ADMIN')
router.get('/',  sectionController.getAll)
router.get('/:id', sectionController.getOne)

module.exports = router