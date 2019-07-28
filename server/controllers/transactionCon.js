const Transaction = require('../models/transaction')

class TransactionController {
    static list(req, res, next) {
        Transaction.find({}).populate('userId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let obj = {
            userId: req.body.userId,
            arrProduct: req.body.arrProduct,
            status: req.body.status,
            totalPayment: 0
        }
        Transaction.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static findbyUserId(req, res, next) {
        Transaction.find({userId : req.params.userId}).populate('userId')
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static findbyTransaction(req, res, next) {
        Transaction.find({status : req.params.status}).populate('userId')
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static updateStatus(req, res, next) {
        let obj = {
            status: req.body.status
        }
        Transaction.findByIdAndUpdate(req.params.id, obj, {new: true})
        .then(data => {
            if (!data) {
                next({ code: 404, message: 'Not Found', resource: 'Transaction' })
            } else {
                res.status(200).json(data)
            }
        }) 
        .catch(next)
    }

    static updateProduct(req, res, next) {
        let totalPayment = 0
        for (let i = 0; i < req.body.arrProduct.length; i++) {
            totalPayment += req.body.arrProduct[i].totalPrice
        }
        let obj = {
            arrProduct: req.body.arrProduct,
            totalPayment: totalPayment
        }
        Transaction.findByIdAndUpdate(req.params.id, obj, {new: true})
        .then(data => {
            if (!data) {
                next({ code: 404, resource: 'Transaction' })
            } else {
                res.status(200).json(data)
            }
        }) 
        .catch(next)
    }

    static delete(req, res, next) {
        Transaction.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) next({ code: 404, message: 'Not Found', resource: 'Transaction' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}
module.exports = TransactionController