const { Schema, model } = require('mongoose')


const transactionSchema = new Schema({
  cart : {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  statusTransaction : {
    type: String,
    default: 'ordered',
    enum: ['ordered', 'shipping', 'delivered']
  },
  address : {
    type: String,
    required: [true, 'address required !']
  },
  courier : {
    type: String,
    required: [true, 'courier required !']
  }
}, {timestamps : true})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction