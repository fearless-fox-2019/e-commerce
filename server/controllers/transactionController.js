const Transaction = require('../models/transaction')
const mongoose =require('mongoose')

class TransactionController {
  static createTransaction(req,res,next)  {
    console.log(req.user)
    Transaction.create({
      products: req.body.products,
      userId: req.decoded._id,
      totalPrice: req.body.totalPrice,
      transactionDate: new Date()
    })
      .then((dataCreated) =>  {
        res.status(201).json(dataCreated)
      })
      .catch(next)
  }

  static getTransactions(req,res,next) {
    Transaction.find({
      userId: req.decoded._id
    })
      .then((dataFound) => {
        res.status(200).json(dataFound)
      })
      .catch(next)
  }
}

module.exports = TransactionController