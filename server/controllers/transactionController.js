const Transaction = require('../models/transaction')
class TransactionController {

  static create(req, res, next){
    let newTransaction = {
      products : req.body.products,
      UserId : req.decoded.id,
      transactionDate : new Date()
    }
    Transaction.create(newTransaction)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }
   
}

module.exports = TransactionController