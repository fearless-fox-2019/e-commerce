const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productname: {
      type: String,
      required: [true, 'Product Name cannot be empty']
  },
  price: {
      type: Number,
      required: [true, 'Price the product cannot be empty']
  },
  stock:{
      type: Number
  },
  image:{
      type: String
  },
  category:{
      type: String,
      required: [true, 'Category the product cannot be empty']
  },
  description:{
      type: String,
      required: [true, 'Description cannot be empty']
  }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
