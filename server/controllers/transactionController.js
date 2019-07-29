const { transactionModel } = require("../models")
const { decodeId } = require('../helpers/jwtoken');
class TransactionController {
  static create(req, res, next) {
    let userId = decodeId(req.headers.token)._id
    let items = req.body.items
    let totalPrice = req.body.totalPrice
    transactionModel.create({
      userId,
      items,
      totalPrice
    })
      .then(function (data) {
        res.status(201).json({
          data,
          msg: 'berhasil create'
        })
      })
      .catch(next)
  }

  static read(req, res, next) {
    let id = decodeId(req.headers.token)._id
    transactionModel.find({userId : id }).populate({path:'userId'}).populate({path:'items'})
      .then(function (data) {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static readAll(req,res,next) {
    transactionModel.find().populate({path:'userId'}).populate({path:'items'})
    .then(function (data) {
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = TransactionController