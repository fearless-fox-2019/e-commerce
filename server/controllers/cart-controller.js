const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {

    static create(req, res, next) {
        // console.log(req.headers.decode, 'masuk ke create cart <<<<<<<<<<<<<<<<<<<<<<<<')
        Cart.create({
                userId: req.headers.decode.id,
                productId: req.params.productId,
                status: 'carted'
            })
            .then(cart => {
                return Promise.all([cart, Product.findById(req.params.productId)])
            })
            .then(([cart, product]) => {
                let currentAmount = product.amount
                let newAmount = currentAmount - 1
                // console.log(newAmount, 'masuk keisni yakk <<<<<<<<<<<,')
                return Promise.all([cart, Product.updateOne({
                    _id: req.params.productId
                }, {
                    $set: {
                        amount: newAmount
                    }
                })])
            })
            .then(([cart]) => {
                res.status(201).json(cart)
            })
            .catch(next)
    }

    static getUserCart(req, res, next) {
        Cart.find({
                userId: req.headers.decode.id
            })
            .populate('productId')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static deleteOne(req, res, next) {
        // console.log(req.params.productId)
        Cart.deleteOne({
                productId: req.params.productId
            })
            .then(deletedRow => {
                return Product.findById(req.params.productId)
            })
            .then(product => {
                let currentAmount = product.amount
                let newAmount = currentAmount + 1
                return Product.updateOne({
                    _id: product._id
                }, {
                    $set: {
                        amount: newAmount
                    }
                })
            })
            .then(updatedRow => {
                res.status(200).json('Successfully deleted 1 cart')
            })
            .catch(next)
    }
}

module.exports = CartController