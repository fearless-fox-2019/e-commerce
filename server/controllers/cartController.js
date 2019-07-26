const Cart= require('../models/cart')


class cartController{

    static findAll(req, res, next){
        Cart.find({customerId: req.decode.id})
        .populate('itemId')
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static create(req, res, next){
        console.log(req.body, '====')
        Cart.find({itemId: req.body.itemId})
        .then(cart =>{
            console.log('ini hasil search', cart)
            if(cart.length == 0){
                let newCart= new Cart({
                    customerId: req.decode.id,
                    itemId: req.body.itemId,
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity
                })
                return newCart.save()
            }else{
                console.log('masuk create else')
                let newQty= Number(cart[0].quantity)+ Number(req.body.quantity)

                return Cart.findByIdAndUpdate(cart[0]._id, {quantity: newQty}, {new: true})
            }
        })
        .then(cart =>{
            console.log('sukses create cart')
            res.status(201).json(cart)
        })
        .catch(next)
    }

    static update(req, res, next){
        Cart.findById(req.params.id, {...req.body},{new: true})
        .then(cart => {
            if(cart){
                res.status(200).json(cart)
            }else{
                res.status(404).json({message: 'Cart not found!'})
            }
        })
        .catch(next)
    }

    static updateInc(req, res, next){
        console.log('masuk update inc', req.params.id)
        Cart.findByIdAndUpdate(req.params.id, {$inc: {quantity: 1}}, {new: true})
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static updateDec(req,res, next){
        Cart.findByIdAndUpdate(req.params.id, {$inc: {quantity: -1}}, {new: true})
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static remove(req, res, next){
        Cart.deleteOne({_id: req.params.id})
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(next)
    }
}

module.exports= cartController