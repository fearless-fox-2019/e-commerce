const indexRouter = require('express').Router(),
    products = require('./product'),
    carts = require('./cart'),
    users = require('./user')

indexRouter.use('/products', products)
indexRouter.use('/carts', carts)
indexRouter.use('/users', users)

module.exports = indexRouter

