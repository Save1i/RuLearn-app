const Router = require('express')
const router = new Router()
const sectionRouter = require('./sectionRouter')
const taskRouter = require('./taskRouter')
const testRouter = require('./testRouter')
const userRouter = require('./userRouter')
const taskProgressRouter = require('./taskProgressRouter')
const testProgressRouter = require('./testProgressRouter')

router.use('/user', userRouter)
router.use('/section', sectionRouter)
router.use('/task', taskRouter)
router.use('/test', testRouter)
router.use('/task-progress', taskProgressRouter)
router.use('/test-progress', testProgressRouter)


module.exports = router