const {Schema, model} = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name required !']
  },
  description: {
    type: String,
    required: [true, 'description required !']
  },
  price: {
    type: Number,
    required: [true, 'price required !']
  },
  stock: {
    type: Number,
    required: [true, 'stock required !']
  },
  image: {
    type: String,
    // required: [true, 'image required']
  }
})

const Product = model('Product', productSchema)

module.exports = Product