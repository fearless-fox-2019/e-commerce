const routes = require('express').Router()
const user = require('./user');
const product = require('./product');


routes.use('/products', product)
routes.use('/users', user)

module.exports = routes
