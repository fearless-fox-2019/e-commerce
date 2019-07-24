const mongoose = require('mongoose')

let Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is required']
    },
    stock:{
        type: Number,
        min: [1,'minimum stock is 1'],
        required: [true, 'stock is required']  
    },
    price:{
        type:Number,
        min: [1,'minimum price is 1'],
        required: [true,'price is required']
    },
    picture:{
        type: String
    }
},{timestamps : true})


const Product = mongoose.model('Product',productSchema)

module.exports = Product