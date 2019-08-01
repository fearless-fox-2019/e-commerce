const Cart = require('../models/cart');

class CartController {
  static create(req, res, next) {
    if(Object.values(req.body).every(el => el)) {
      Cart.findOne({ ProductId: req.body.ProductId })
        .populate('ProductId')
        .then(cart => {
          if(cart) {
            cart.quantity += req.body.quantity
            cart.totalPrice = cart.quantity * cart.ProductId.price
            return cart.save()
            .then(cart=> res.status(201).json(cart))
            .catch(next)
          }
          else {
            Cart.create(req.body)
              .then(res.status(201).json(cart))
              .catch(next)
          }
        })
      .catch(next)
    }
    else throw { status: 400, message: 'Invalid input data' }
  }

  static findAll(req, res, next) {
    Cart.find({ UserId: req.decoded._id })
      .populate('UserId', 'name')
      .populate('ProductId')
      .then(cart => res.status(200).json(cart))
      .catch(next)
  }

  static destroy(req, res, next) {
    Cart.findByIdAndDelete(req.params.id)
      .then(cart => res.status(202).json(cart))
      .catch(next)
  }
}

module.exports = CartController;