const Cart = require('../models/cart')
const Product = require('../models/product')
class CartController {
    static addCart(req, res, next){
        console.log("masuk controller");
        
        const {ProductId, quantity} = req.body
        console.log(quantity, "test ini quantity");
        
        Product.findByIdAndUpdate(ProductId, {$inc : {qty : -1}})
        .then(found => {
            if(found){
                console.log(found, "founded");
                let totalPrice = quantity * found.price
                let newCart = {
                    ProductId, qty : quantity, totalPrice, UserId : req.decoded.id
                }
                return Cart.create(newCart)
                .then(created => {
                    console.log("success");
                    
                    res.status(201).json(created)
                })
                .catch(next)
            } else {
                throw {
                    code : 404
                }
            }
        })
        .catch(next)
        // Cart.create
    }

    static getUserCart(req, res, next){
        Cart.find({UserId : req.decoded.id }).populate('ProductId')
        .then(data => {
            console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteCart(req, res, next){
        Cart.deleteOne({_id : req.params.id})
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = CartController