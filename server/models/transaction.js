const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Shoe = require('../models/shoes')

const transactionSchema = new Schema({
  products: [{
    type: Object
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    required: [true,'price is required']
  },
  transactionDate: {
    type: Date,
    required: [true, 'date is required']
  }
})

transactionSchema.pre('save',function(next) {
  // console.log(this.products, 'ini products')
  this.products.forEach((product) => {
    Shoe.findById(product.productId._id)
      .then((data) => {
        console.log('halo ini data')
        if(data.quantity >= product.quantity) {
          console.log('halooo ini quantity')
          data.quantity -= product.quantity
          data.save()
        } else {
          throw {status: 400, message: 'product quantity must be bigger than whats bought'}
        }
      })
      .catch(next)
  })
  // console.log(this.products.productId,  'ini product nya');
  // let filter = this.products.filter(product => product.productId._id)
  // this.products.find((prodocut) => product.)
  next()
})

const Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction



