const Transaction = require('../models/transactions')


class ControllerTransaction {
  static async findUser (req, res, next) {
    try {
      const transactions = await Transaction.find({user : req.user._id}).populate('cart').populate('user')
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  static async findAll (req, res, next) {
    try {
      const transactions = await Transaction.find().populate('cart').populate('user')
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  static async makeTransaction (req, res, next) {
    try {
      const { cart, address, courier } = req.body
      const input = {
        cart,
        user: req.user._id,
        address,
        courier
      }
      const transaction = await Transaction.create(input)
      res.status(201).json(transaction)
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus (req, res, next) {
    try {
      const transaction = await Transaction.findById({_id: req.params.transactionId})
      if(transaction) {
        transaction.status = 'delivered'
        const result =  await transaction.save()
        res.status(200).json(result)
      } else {
        throw {status: 404, resource: 'transaction'}
      }
    } catch (error) {
      next(error)
    }
  }

  static async cancelTransaction (req, res, next) {
    try {
      const deleteResult = await Transaction.deleteOne({_id: req.params.transactionId})
      res.status(200).json(deleteResult)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerTransaction