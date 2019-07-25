const router = require('express').Router()
const userRouter = require('./userRoutes')
const itemRouter = require('./itemRoutes')
const transactionRouter = require('./transactionRoutes')

router.use('/users',userRouter)
router.use('/items',itemRouter)
router.use('/transactions',transactionRouter)

module.exports = router