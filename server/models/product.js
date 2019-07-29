const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must input product name']
    },
    price: {
        type: Number,
        required: [true, 'Must input product price']
    },
    stock: {
        type: Number,
        required: [true, 'Must input product stock']
    },
    detail: {
        type: String,
        required: [true, 'Must input product detail']
    },
    image_path: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema)