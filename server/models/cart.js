const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  status:{
      type: Boolean,
      required: [true, "Status cannot be empty"],
      default: false
  },
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
  },
  productId: {
      type: Schema.Types.ObjectId,
      ref: "Shoe"
  },
  quantity: {
      type: Number,
  },
  checkoutDate: {
      type: Date
  }
})

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart