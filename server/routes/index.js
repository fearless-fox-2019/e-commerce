const route = require('express').Router()
const users = require('./user')
const carts = require('./cart')
const transactions = require('./transaction')
const products = require('./product')
const { authentication } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')

route.use('/users', users)

route.use('/products', products)

route.use(authentication)

route.use('/carts', carts)
route.use('/transactions', transactions)

route.use(errorHandler)

module.exports = route