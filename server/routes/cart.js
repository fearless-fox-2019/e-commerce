const route = require('express').Router()
const CartController = require('../controllers/cartController')

route.get('/', CartController.getCart)
route.patch('/:productId', CartController.addProduct)
route.delete('/:productId', CartController.removeProduct)

module.exports = route