const Cart = require('../models/cart')
const User = require('../models/user')
class ControllerCart {
    static create(req, res, next) {
        const { productCart,selectedSize } = req.body
        let input = { productCart ,selectedSize}
        input.userCart = req.headers.decoded._id
        Cart.create(input)
            .then((cart) => {
                res.status(201).json(cart)
            })
            .catch(next)
    }
    static get(req, res, next) {
        Cart.find({userCart:req.headers.decoded._id}).populate('userCart').populate('productCart')
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Cart.findById(req.params.id)
            .then((cart) => {
                res.status(200).json(cart)
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        Cart.deleteOne({ _id: req.params.id })
            .then((cart) => {
                res.status(200).json({
                    message: `berhasil terdelete pada id ${req.params.id}`
                })
            })
            .catch(next)
    }
    static update(req, res, next) {
        Cart.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
            .then((cart) => {
                res.status(200).json(cart)
            })
            .catch(next)
    }
}
module.exports = ControllerCart