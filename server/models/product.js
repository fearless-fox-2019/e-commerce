const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let productSchema = new Schema({
    name : {
        type : String,
        required : [true, "Product's name is mandatory"]
    },
    description : {
        type : String,
        required : [true, 'please input product description']
    },
    image : {
        type : String,
        required : [true, "Product's image is required"]
    },
    price : {
        type : Number,
        required : [true, 'Every product must have price'],
        min : [0, "Product's price can't be less than 0"]
    },
    category : {
        type : String,
        required : [true, 'Product must be clasiffied']
    },
    stock : {
        type : Number,
        required : [true, 'Please input initial stock'],
        min : [0, "Product's stock can't be less than 0"]
    }
})

const product = mongoose.model('product', productSchema)

module.exports = product