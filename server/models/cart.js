var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  ProductId : {type: Schema.Types.ObjectId, ref: 'Product'},
  qty : Number,
  totalPrice : Number,
  UserId : {type : Schema.Types.ObjectId, ref: 'User'}
}, {timestamps : true});

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart