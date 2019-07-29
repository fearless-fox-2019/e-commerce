const transactionModel = require('../models/transactionModel')
const itemModel = require('../models/itemModel')
const userModel = require('../models/userModel')

class TransactionController {
  static findAll (req, res, next) {
    let query = req.query.status

    transactionModel
      .find({})
      .populate('item.itemid')
      .populate('userId', 'username email _id')
      .then(allTransaction => {
        // console.log(allTransaction)
        res.status(200).json(allTransaction)
      })
  }
  static findOne (req, res, next) {
    let transactionId = req.params.transactionId

    transactionModel
      .findById(transactionId)
      .populate('item')
    populate('userId')
      .then(foundTransaction => {
        console.log(transactionId)
        res.status(200).json(foundTransaction)
      })
      .catch(next)
  }
  static findByStatus (req, res, next) {
    let query = req.query.status.toLowerCase()

    transactionModel
      .find({
        status: query
      })
      .then(found => {
        res.status(200).json(found)
      })
      .catch(next)
  }
  static findByUserId (req, res, next) {
    let query = req.params.userId

    transactionModel
      .find({
        userId: query
      })
      .then(found => {
        res.status(200).json(found)
      })
      .catch(next)
  }
  static create (req, res, next) {
    let {userId, status, item, address} = req.body
    let uniqueitem = [...new Set(item)]
    let finalitem = []
    uniqueitem.forEach(unique => {
      let temp = {}
      for (let i = 0; i < item.length; i++) {
        console.log(item[i], '=-=-=-=-=-=-==--= ini item i')
        if (unique == item[i]) {
          temp.itemid = unique
          temp.itemname = item[i].itemname
          temp.ammount = 1 + (temp.ammount || 0)
        }
      }
      finalitem.push(temp)
    })
    let newTransaction = {
      userId,
      status,
      address,
      item: finalitem.sort()
    }
    console.log(newTransaction, 'ini final item')
    itemModel
      .find({
        _id: uniqueitem
      })
      .then(result => {
        console.log(result.sort(), finalitem, '=-=-=-=-=-`1=-`=1-=`-1`=1-`=1-=`-1=`-1=-')
        let totalPrice = 0
        result.forEach((el, i) => {
          console.log(el._id, finalitem[i].itemid, 'ini itemnamenya doang')
          if (el._id.toString() === finalitem[i].itemid) {
            newTransaction.item[i].itemname = el.itemname
            newTransaction.item[i].price = el.price
            newTransaction.item[i].image = el.image
            totalPrice += (el.price * finalitem[i].ammount)
          }
        })
        newTransaction.totalPrice = totalPrice
        console.log(newTransaction, 'sebelum di create')
        return transactionModel
          .create(newTransaction)
      })
      .then(created => {
        console.log('success create transaction', created._id)
        // res.status(201).json(created)
        return userModel
          .findById(userId)
      })
      .then(found => {
        found.cart = []
        return userModel
            .findByIdAndUpdate(userId,found,{new:true})
      })
      .then(updated => {
          console.log(updated)
          res.json(updated)
      })
      .catch(next)
  }
  static update (req, res, next) {
    let transactionId = req.params.transactionId
    let update = {
      status: req.body.status
    }

    transactionModel
      .findByIdAndUpdate(transactionId, update, {
        new: true
      })
      .then(updated => {
        res.status(200).json(updated)
      })
      .catch(next)
  }
  static delete (req, res, next) {
    let transactionId = req.params.transactionId

    transactionModel
      .findByIdAndDelete(transactionId)
      .then(deleted => {
        console.log(deleted)
        res.status(200).json(deleted)
      })
  }
}

module.exports = TransactionController
