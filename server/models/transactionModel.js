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
        itemid: {
            type: Schema.Types.ObjectId,
            required: [true, `item id needed`]
        },
        itemname: {
            type: String,
            required: [true, `item id needed`]
        },
        image: {
            type: String,
            required: [true, `item id needed`]
        },
        price: {
            type: Number,
            required: [true, `item id needed`]
        },
        ammount: {
            type: Number,
            min: 1
        }
    }],
    address: {
        type: String,
        required: [true, 'Required address to send item']
    }  
},{
    timestamps: true
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
