const router = require('express').Router()
const userRoutes = require('./userRoutes')
const gameRoutes = require('./gameRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')

router.use('/users', userRoutes)
router.use('/games', gameRoutes)
router.use('/carts', cartRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router