const {Schema, model} = require('mongoose')


const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    product : {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: {
      type: String
    },
    total: {
      type: Number,
      default: 1
    },
    totalPrice: {
      type: Number
    },
    image: {
      type: String
    }
  }],
  status: {
    type: Boolean,
    default: false
  }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart