const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const { authentication } = require('../middlewares/middleware')

router.use('/user', userRoutes)
router.use('/products', productRoutes)
router.use('/carts', authentication, cartRoutes)


module.exports = router