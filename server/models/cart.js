const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Shoe = require('../models/shoes')

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

// cartSchema.pre('updateMany', function (next) {
//     let input = {productId: this.productId}
//     console.log('masukkkk sini dong')
//     console.log(this.productId, 'asd')
//     Shoe.findById(input) 
//         .then((dataFound) => {
//             console.log(dataFound)
//         })
//         next()
// });
module.exports = Cart