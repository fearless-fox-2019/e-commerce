const Cart = require('../models/cart')

class CartController{
    static addToCart(req, res){
        const UserId = req.decoded.id
        console.log(UserId)
        const {ProductId} = req.body
        const newData = {UserId, ProductId}
        Cart.create(newData)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static getAllByUserId(req, res){
        Cart.find({UserId: req.params.userid})
        .populate('User')
        .populate('Product')
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static deleteProduct(req, res){
        Cart.findByIdAndRemove({_id: req.params.id})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static getAllByProductId(req, res){
        Cart.find({ProductId: req.params.productid})
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

}

module.exports = CartController