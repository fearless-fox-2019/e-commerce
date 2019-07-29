const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Product = require('../models/product')
const sendEmail = require('../helpers/nodemailer')
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
                return Cart.deleteMany({
                    _id : {
                        $in : cartIds
                    },
                    
                })
            })
            .then(data => {
                products.forEach(el => {
                    productIds.push(el._id)
                });

                let docUpdate = []
                products.forEach(el => {
                    docUpdate.push(el.stock-el.amount)
                })
                let arrayOfPromises = []
                productIds.forEach((el, i) => {
                    arrayOfPromises.push(Product.findByIdAndUpdate(el, {stock : docUpdate[i]}))
                })
                

                return Promise.all(arrayOfPromises)
            })
            .then(data => {
                console.log('success Update');
                console.log('data: after create trans, delete cart, after promise all ', data);
                console.log('result: ', result);
                console.log('ok');
                let textToSend = `
                    <h1> Hello ${req.loggedUser.username} </h1>
                    <h3> Thank you for choosing BRIDEZILLA</h3>
                    <p> We really exited to serve best things for you.</p>
                    <p> Your purchases have been sent to the destination.</p>
                    <p> Customer Details : </p>
                    <p><b>Name : ${req.loggedUser.username || emailTo}</b></p>
                    <p><b>Email : ${emailTo}</b></p>
                    <p><b>Phone Number : ${phoneTo}</b></p>
                    <p><b>Delivery To : ${deliveryTo}</b></p>
                    <p><b>Payment Date : ${new Date().toDateString()}</b></p>
                    <p><b>Total Payment : ${totalPrice}</b></p>
                    <br>
                    <br><hr>
                    <h4>Sincerely, </h4>
                    <h4>Bridezilla Team</h4>`
                sendEmail(emailTo, textToSend)
                res.status(201).json(result)

            })
            .catch(err => {
                console.log('eror dari trans create', err);
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