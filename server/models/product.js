const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    featured_image: {
        type: String
    }
})

productSchema.pre('updateOne', function (next) {
    if (this._update.price < 0) {
        throw new Error('Minimum price is 0')
    } else {
        next()
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;