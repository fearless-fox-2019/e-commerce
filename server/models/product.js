const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName:  {
    type : String,
    required : [true, `Please Provide a Name for the Product`],
  },
  productDescription: {
    type : String,
    required : [true, `Please Provide a Description`],
  },
  quantity: {
    type : Number,
    required : [true, 'Please Specify the Quantity'],
    min : [1, `Quantity Must be Greater Than 0`],
  },
  price : {
    type : Number,
    required : [true, 'Please Specify the Item Price'],
    min : [100, `Price Must be Greater Than 10`],

  },
  picture  : {
    type : String,
    default : null
  }
}, {
  versionKey : false,
  timestamps : true
});

let Product = mongoose.model('product', productSchema)

module.exports = Product
