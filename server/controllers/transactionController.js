const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Product = require('../models/product')
class TransactionController{
    static create(req, res){
        let result = []
        let productIds = []
        let {cartIds, products, totalPrice, deliveryTo, emailTo, phoneTo} = req.body
        Transaction.create({
            userId: req.loggedUser.id,
            products, totalPrice, deliveryTo, emailTo, phoneTo    
        })
            .then((data) => {
                result = data
                return Cart.findOneAndDelete({
                    _id : {
                        $in : cartIds
                    },
                    
                })
            })
            // .then(data => {
            //     products.forEach(el => {
            //         productIds.push(el._id)
            //     });
            //     let docUpdate = []
            //     products.forEach(el => {
            //         docUpdate.push(el.amount)
            //     })
            //     return Product.updateMany({
            //         _id: {
            //             $in : productIds
            //         }
            //     }, {
            //         stock: {
            //             $in: docUpdate
            //         }
            //     })
            // })
            .then(data => {
                console.log('success Update');
                console.log('data: ', data);
                console.log('result: ', result);
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static findAll(req, res){
        Transaction.find({})
            .populate('userId')
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static findOne(req, res){
        Transaction.find({
            userId : req.params.userId
        })
            .populate('userId')
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TransactionController