const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema= new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    image: {
        type: String,
        required: [true, 'Image required']
    },
    category:{
        type: String,
        enum: ['choco', 'cheese', 'ice cream', 'nougat', 'classic', 'wedding']
    },
    description:{
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price must be defined'],
        min: 0
    },
    stock: {
        type: Number,
        required: [true, 'Stock must be defined'],
        min: 0
    }
},{timestamps: true})

let Item= mongoose.model('Item', itemSchema)

module.exports= Item