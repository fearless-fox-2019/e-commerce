const router = require('express').Router()
const userRoutes = require('./userRoutes')
const gameRoutes = require('./gameRoutes')
const cartRoutes = require('./cartRoutes')

router.use('/users', userRoutes)
router.use('/games', gameRoutes)
router.use('/cart', cartRoutes)

module.exports = router