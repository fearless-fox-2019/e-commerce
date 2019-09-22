const router = require('express').Router()
const userRoutes = require('./users')
const productRoutes = require('./products')
const cartRoutes = require('./carts')
const transactionRouters = require('./transactions')


router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)
router.use('/transactions', transactionRouters)


module.exports = router