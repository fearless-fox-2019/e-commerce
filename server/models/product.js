const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    name : {
      type : String,
      required: [true, `Required Item Name`]
    },
    quantity : {
      type : Number
    },
    picture : {
      type : String
    },
    description : {
      type : String
    },
    price : {
      type : Number,
      required: [true, `Required Item Name`]
    }
}, { versionKey: false, timestamps: true })

let Product = mongoose.model('product', productSchema)

module.exports = Product