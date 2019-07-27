const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema= new Schema({
    customerId:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    items:[{
        itemId: {
            type: Schema.Types.ObjectId, 
            ref: 'Item'
            },
        name: {
            type: String,
        },
        price:{
            type: Number
        },
        quantity: {
            type:Number,
            min : [1, 'not valid input amount']
            },
    }],
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        required: [true, 'status required'],
        enum: ['unpaid', 'paid', 'send', 'complete'],
        default: 'unpaid'
    },
    address:{
        type: String
    },
    shipping:{
        type: String,
        enum: ['Go-Send', 'Grab-Send']
    }
},{timestamps: true})

let Transaction= mongoose.model('transaction', transactionSchema)

module.exports= Transaction