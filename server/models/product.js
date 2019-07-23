const mongoose = require('mongoose');
const {Schema} = mongoose;

let productSchema = new Schema ({
    itemName : String,
    stock : Number,
    price : Number,
    img : String,
    description : String
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product