const Cart = require('../models/cart')
const Game = require('../models/game')
class CartController {
    // static findAll(req, res, next){
    //   Cart
    // }
    static addToCart(req, res, next){
      console.log(req.headers.gameid)
      Game.findOne({_id : req.headers.gameid})
      .then(data => {
        console.log(data)
        let newCart = {
          UserId : req.decoded.id,
          ProductId : req.headers.gameid,
          quantity : 1,
          totalPrice : data.price
        }
        return Cart.create(newCart)
      })      
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
    }    
   
}

module.exports = CartController