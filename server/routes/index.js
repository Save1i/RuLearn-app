const Router = require('express')
const router = new Router()
const sectionRouter = require('./sectionRouter')
const taskRouter = require('./taskRouter')
const testRouter = require('./testRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/section', sectionRouter)
router.use('/task', taskRouter)
router.use('/test', testRouter)

module.exports = router