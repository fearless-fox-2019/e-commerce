const mongoose = require('mongoose');
const {Schema} = mongoose;

let TransactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId, 
        ref : 'User'
    },
    products : [{
        type: Object,
        required: true
    }],
    totalPrice : {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: new Date(),
        required: true
    },
    deliveryTo: {
        type: String,
        required: true
    },
    emailTo: {
        type: String,
        required: true
    },
    phoneTo: {
        type: String,
        required: true
    }
})

let Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction
