const Transaction= require('../models/transaction')


class transactionController{

    static create(req, res, next){


        let newTransaction= new Transaction({
            customerId: req.decode.id,
            items: req.body.items,
            address: req.body.address,
            shipping: req.body.shipping
        })

        newTransaction.save()
        .then(transaction=>{
            res.status(201).json(transaction)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        // console.log('masuk find transaction')
        Transaction.find({status: req.params.status})
        .populate('custId')
        .populate({
            path: 'items',
                populate: {
                path: 'item',
                model: 'Item'
                } 
        })
        .then(transactions=>{
            
            res.status(200).json(transactions)
        })
        .catch(next)
    }

    static findAllCust(req, res, next){
        
        Transaction.find({customerId:req.params.custId, status: req.params.status})
        .populate('custId')
        .populate({
            path: 'items',
                populate: {
                path: 'item',
                model: 'Item'
                } 
        })
        .then(transactions=>{
            
            res.status(200).json(transactions)
        })
        .catch(next)
    }

    static update(req, res, next){
        console.log(req.params.id)
        Transaction.findByIdAndUpdate(req.params.id, {...req.body},{new: true})
        .then(transaction=>{
            res.status(200).json(transaction)
        })
        .catch(next)
    }

    static remove(req, res, next){
        Transaction.findById(req.params.id)
        .then(transaction=>{
            if(transaction){
                Transaction.deleteOne({_id: transaction._id})
                .then(() =>{
                    res.status(200).json(transaction)
                })
                .catch(next)

            }else{
                throw {code: 404, message: 'Transaction Not Found'}
            }
        })
        .catch(next)
    }

    

}

module.exports= transactionController