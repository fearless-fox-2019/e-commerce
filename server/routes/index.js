const route = require('express').Router()
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const cartRoutes = require('./cartRoutes')

route.use('/products', productRoutes)
route.use('/users', userRoutes) 
route.use('/carts', cartRoutes)

module.exports = route