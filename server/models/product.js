const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productname : String,
  image : String,
  price : Number,
  category : Array,
  qty : Number,
  UserId : {type : Schema.Types.ObjectId, ref: 'User'}
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product