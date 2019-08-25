const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  },
  items : [{type: Schema.Types.ObjectId, ref:'product'}],
  totalPrice : Number
}, { versionKey: false, timestamps: true })

let Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction