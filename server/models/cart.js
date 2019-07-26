const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema= new Schema({
    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    itemId:{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    name: String,
    price: Number,
    quantity:{
        type: Number,
        min : [1, 'Input min 1']
    }
},{timestamps: true})

let Cart= mongoose.model('Cart', cartSchema)

module.exports= Cart