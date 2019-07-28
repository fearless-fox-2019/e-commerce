const Cart = require("../models/cart");
const Item = require("../models/item");

class CartController{

    static create(req, res, next){

        const cartData = {
            customerId: req.headers.payload.id,
            itemId: req.body.itemId,
            quantity: req.body.quantity
        }
        
        let newCart;
        Cart.create(cartData)
            .then((data) => {
                newCart = data;
                return Item.findByIdAndUpdate(newCart.itemId, { $inc: {stock: -(newCart.quantity)} })
            })
            .then((data) => {
                console.log(`CART CREATED [${newCart.id} on ${new Date()}]`);
                res.status(201).json({message: "Succeed", id: newCart._id});
            })
            .catch((err) => {
                next(err);
            });
    }

    static delete(req, res, next){
        
        Cart.findByIdAndDelete(req.params.id)
            .then((data) => {
                console.log(`CART DELETED [${data._id} on ${new Date()}]`);
                res.status(200).json({message: "Succeed", id: data._id});
            })
            .catch((err) => {
                next(err);
            });

    }
}

module.exports = CartController;