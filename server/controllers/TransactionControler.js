const transactionModel = require('../models/transactionModel')

class TransactionController {
    static findAll(req, res, next) {
        let query = req.query.status

        transactionModel
            .find({})
            .populate('item')
            .populate('userId', 'username email _id')
            .then(allTransaction => {
                // console.log(allTransaction)
                res.status(200).json(allTransaction)
            })
    }
    static findOne(req, res, next) {
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
    static findByStatus(req, res, next) {
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
    static findByUserId(req, res, next) {
        let query = req.query.userId.toLowerCase()

        transactionModel
            .find({
                userId: query
            })
            .then(found => {
                res.status(200).json(found)
            })
            .catch(next)
    }
    static create(req, res, next) {
        let {
            userId,
            status,
            totalPrice,
            item
        } = req.body
        let newTransaction = {
            userId,
            status,
            totalPrice,
            item
        }
        console.log(newTransaction, 'ini new Transactions')
        transactionModel
            .create(newTransaction)
            .then(created => {
                console.log(created)
                res.status(201).json(created)
            })
    }
    static update(req, res, next) {
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
    static delete(req, res, next) {
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