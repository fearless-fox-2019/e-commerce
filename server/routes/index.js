const router = require('express').Router()
const transRoutes = require('./transactionRoutes')
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const { authentication } = require('../middlewares/middleware')

router.use('/user', userRoutes)
router.use('/products', productRoutes)
router.use('/trans', transRoutes)
router.use('/carts', authentication, cartRoutes)


module.exports = router