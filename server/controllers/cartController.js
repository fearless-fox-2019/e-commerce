const Cart = require('../models/cart')
const Game = require('../models/game')
class CartController {
    // static findAll(req, res, next){
    //   Cart
    // }
    static addToCart(req, res, next){
         let newCart = {
          UserId : req.decoded.id,
          GameId : req.body.GameId,
          quantity : 1,
          totalPrice : req.body.price,
          checkoutStatus : false
        }
      Cart.create(newCart)
      .then(data => {
        console.log(data)
        res.status(201).json(data)
      })
      .catch(next)
    }

    static findOneUncheckedOut(req, res, next){
      Cart.findOne({UserId : req.decoded.id, GameId : req.params.id, checkoutStatus : false})
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }
    
    static getAllCart(req, res, next) {
      console.log(req.decoded.id)      
      Cart.find({ UserId : req.decoded.id, checkoutStatus : false }).populate('GameId')
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }

    static delete(req, res, next){
      Cart.deleteOne({ _id : req.params.id })
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }

    static update(req, res, next){
      let updatedata = {
        quantity : req.body.quantity,
        totalPrice : req.body.totalPrice
      }
      Cart.updateOne({ _id : req.params.id }, updatedata)
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }
    
    static updateStatus(req, res, next){
      Cart.updateOne({ _id : req.params.id }, {checkoutStatus : true})
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }
}

module.exports = CartController