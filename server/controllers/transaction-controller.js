const Transaction = require('../models/transaction');
const Cart = require('../models/cart');
const Product = require('../models/product');

class TransactionController {
  static create(req, res, next) {
    let trans = {}
    if(Object.values(req.body).every(el => el)) {
      Transaction.create(req.body)
        .then(transaction => {
            trans = transaction
            return Cart.find({ UserId: req.decoded._id })
        })
        .then(carts => {
          carts.forEach(cart => {
            return Product.findOne({ _id: cart.ProductId })
            .then(product => {
              product.stock -= cart.quantity
              return product.save({ validateBeforeSave: false })
            })
          })
        })
        .then(resultUpdate => {
          return Cart.deleteMany({ UserId:req.decoded._id })
        })
        .then(cart => res.status(201).json(trans))
        .catch(next);
    }
    else throw { status: 400, message: 'Invalid input data' }
  }

  static findBelongs(req, res, next) {
    Transaction.find({ UserId: req.decoded._id })
    .populate('ProductId')
    .then(transactions => res.status(200).json(transactions))
    .catch(next)
  }

  static list(req, res, next) {
    Transaction.find()
      .sort({ createdAt: -1 })
      .populate('ProductId')
      .populate('UserId')
      .then(transactions => res.status(200).json(transactions))
      .catch(next)
  }

  static changeStatus(req, res, next) {
    Transaction.findOneAndUpdate({ _id: req.params.id }, { status: req.params.status })
    .then(transactions => res.status(200).json(transactions))
    .catch(next)
  }
}

module.exports = TransactionController
