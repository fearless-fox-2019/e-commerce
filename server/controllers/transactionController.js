const Transaction = require('../models/transaction')
const User        = require('../models/user')
const Product     = require('../models/product')

class TransactionController {
    static getAll(req, res, next) {
        let field = {}

        if (req.authenticatedUser.role !== 'Admin') {
            field = {
                buyer: req.authenticatedUser._id
            }
        }

        Transaction
            .find(field)
            .populate('products.product')
            .then(transactions => {
                res
                    .status(200)
                    .json(transactions)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOne(req, res, next) {
        Transaction
            .findById(req.params.id)
            .populate('products.product')
            .populate('buyer', { name: 1 })
            .then(transaction => {
                if (!transaction) {
                    res
                        .status(404)
                        .json({
                            message: 'Transaction not found'
                        })
                } else {
                    res
                        .status(200)
                        .json(transaction)
                }
            })
            .catch(err => {
                next(err)
            })
    }
         
    static create(req, res, next) {
        User
            .findById(req.authenticatedUser._id, {
                password: 0
            })
            .populate('cart')
            .then(user => {
                if (user.cart.length === 0) {
                    res
                        .status(400)
                        .json({
                            message: 'Cart empty'
                        })
                } else {
                    let cart = req.body.cart
                    let total_price = req.body.total
                    let products = []
                    let productsId = []
                    let quantity = []

                    cart.forEach(el => {
                        quantity.push( Number(el.quantity))
                    })
                    console.log(quantity, '====')

                    user.cart.forEach(product => {
                        products.push({
                            product: product._id
                        })
                        productsId.push(product._id)
                    })

                    const promiseArr = [ 
                        Transaction
                            .create({
                                buyer: req.authenticatedUser._id,
                                products,
                                total_price
                            }),
                        User
                            .updateOne({
                                _id: req.authenticatedUser._id
                            }, { $set: {
                                    cart: []
                                }
                            }),
                        Product
                            .updateMany({
                                _id: { $in: productsId}
                            }, {
                                $inc: { stock: -1},
                                // $set: { quantity: quantity } 
                            })
                    ]
                    return Promise.all(promiseArr)
                }
            })
            .then(([newTransaction, updatedUser, productUpdated]) => {
                res
                    .status(201)
                    .json(newTransaction)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        Transaction
            .updateOne({
                _id: req.params.id,
                'products.product': req.params.productId
            }, {
                $set: {
                    'products.$.status': req.body.status
                }
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json({
                            message: 'Transaction updated'
                        })
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Transaction not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TransactionController