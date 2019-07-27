const Transaction= require('../models/transaction')
const Item= require('../models/item')
const Cart= require('../models/cart')

class transactionController{

    static create(req, res, next){

        let cartItem=req.body.items
        let allPromise=[]
        let totalPrice=0
        
        cartItem.forEach(el => {
            console.log(el)
            let qty= Number(el.quantity)
            let price= Number(el.price)
            totalPrice += qty*price

            allPromise.push(Item.findByIdAndUpdate(el.itemId, {$inc: {stock: -qty}}))
        })

        let newTransaction= new Transaction({
            customerId: req.decode.id,
            items: req.body.items,
            totalPrice: totalPrice,
            address: req.body.address,
            shipping: req.body.shipping
        })

        allPromise.push(newTransaction.save())
        allPromise.push(Cart.deleteMany({customerId: req.decode.id}))
       

        Promise.all(allPromise)
        .then(transactions=>{

            res.status(201).json(transactions[transactions.length-2])
        })  
        .catch(next)
    }

    static findAll(req, res, next){
        // console.log('masuk find transaction')
        Transaction.find({})
        .populate('customerId')
        .populate({
            path: 'items',
                populate: {
                path: 'item',
                model: 'Item'
                } 
        })
        .sort({createdAt: -1})
        .then(transactions=>{
            
            res.status(200).json(transactions)
        })
        .catch(next)
    }

    static findAllCust(req, res, next){
        console.log('masuk find all cust')
        Transaction.find({customerId:req.params.custId})
        .populate('customerId')
        .populate('items.itemId')
        .sort({createdAt: -1})
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