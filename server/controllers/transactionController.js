const Transaction = require('../models/transaction')
class TransactionController {

  static create(req, res, next){
    let newTransaction = {
      products : req.body.products,
      UserId : req.decoded.id,
      totalPrice : req.body.totalPrice,
      transactionDate : new Date(),
      deliveredStatus : false
    }
    Transaction.create(newTransaction)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }

  static findTransaction(req, res, next){
    console.log(req.decoded.id)    
    Transaction.find({ UserId : req.decoded.id}).sort({'transactionDate' : 'desc'})
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(next)
  }

  static confrimItem(req, res, next){
    Transaction.updateOne( { _id : req.params.id }, { deliveredStatus : true })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }
   
}

module.exports = TransactionController