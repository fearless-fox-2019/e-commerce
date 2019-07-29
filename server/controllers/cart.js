const Cart = require('../models/cart')

module.exports = class CartController {
    static findAll (req, res, next) {
        Cart.findAll(req.query)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }
    static addItem (req, res, next) {
        Cart.create(req.body)
            .then( data => {
                res.status(201).json(data)
            })
            .catch( err => next(err) )            
    }
    static updateCount (req, res, next) {
        Cart.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }
    static deleteItem (req, res, next) {
        Cart.findByIdAndDelete(req.params.id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }
}