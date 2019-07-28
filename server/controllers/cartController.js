const Cart = require('../models/cart')
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

class CartController {
  static createCart(req,res,next) {
    let filter = {userId: req.body.userId, productId: req.body.productId, status:false}
    let updateData = {$inc: {quantity: req.body.quantity}}
    Cart.findOneAndUpdate(filter, updateData)
      .then((updatedData) => {
        if(updatedData) {
          res.status(200).json(updatedData)
        } else {
          let input = {
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            checkoutDate: null
          }
          return Cart.create(input)
        }
      })
      .then((cartCreated) => {
        res.status(201).json(cartCreated)
      })
      .catch(next)
  }

  static deleteCart(req,res,next) {
    let input = {
      _id: req.params.id
    }
    Cart.deleteOne(input)
      .then((deleted) => {
          res.status(200).json(deleted)
      })
      .catch(next)
  }

  static updateQuantity(req,res,next) {
    let input = {

    }
  }

  static findCart(req,res,next) {
    let input = {
      userId: new ObjectId(req.params.userId),
      status: false
    }
    Cart
      .find(input)
      .populate('userId')
      .populate('productId')
      .then((cartFound) => {
        console.log(cartFound)
        res.status(200).json(cartFound)
      })
      .catch(next)
  }

  static checkOut(req,res,next) {
    let input = {
      userId: req.body.userId,
      status: false
    }
    let updatedField = {
      status: true
    }
    Cart.findOneAndUpdate(input,)
  }
}

module.exports = CartController