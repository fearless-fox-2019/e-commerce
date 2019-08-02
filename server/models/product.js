const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name required']
    },
    price: {
        type: Number,
        required: [true, 'Product price required'],
        min: [1, 'Invalid input']
    },
    stock: {
        type: Number,
        default: 1,
        min: [1, 'Invalid input']
    },
    image: String,
    description: String,
    quantity: {
        type: Number,
        default: 1,
        required: [true, 'Quantity cannot be zero']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;