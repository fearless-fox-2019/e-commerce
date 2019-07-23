const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const shoeSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  brand: {
    type: String,
    required: [true, 'brand is required'],
    unique: true
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

shoeSchema.plugin(uniqueValidator, { message:'Error, expected {PATH} must be unique.' });
const Shoe = mongoose.model('Shoe',shoeSchema)

module.exports = Shoe