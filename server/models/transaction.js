const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : "Users"
    },
    arrProduct: [{
        img: String,
        productName: String,
        price: Number,
        amount: Number,
        totalPrice: Number
    }],
    totalPayment: Number,
    status: String
    // STATUSNYA CART, PAID, RECEIVED
}, {timestamps : true});

const Transactions = mongoose.model('Transactions', transactionSchema);
module.exports = Transactions