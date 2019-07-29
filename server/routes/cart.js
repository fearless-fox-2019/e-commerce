const cartRouter = require('express').Router(),
    cartController = require('../controllers/cart')

cartRouter.get('/', cartController.findAll)
cartRouter.post('/', cartController.addItem)
cartRouter.patch('/:itemId', cartController.updateCount)
cartRouter.delete('/:itemId', cartController.deleteItem)

module.exports = cartRouter