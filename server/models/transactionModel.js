const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId required']
    },
    status: {
        type: String,
        default: 'ordered'
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    item: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: []
    }],  
},{
    timestamps: true
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
