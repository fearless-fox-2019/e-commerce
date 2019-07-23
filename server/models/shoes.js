const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  brand: {
    type: String,
    required: [true, 'brand is required']
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required']
  },
  description:  {
    type: String,
    required: [true, 'description is required']
  },
  image: {
    type: String,
    required: [true, 'image is required']
  }
})

const Shoe = mongoose.model('Shoe',shoeSchema)

module.exports = Shoe