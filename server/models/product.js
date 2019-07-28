const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ProductSchema = new Schema({
    name : {
        type: String,
        // required: [true, "Title cannot be empty"]
    },
    description : {
        type: String,
        // required: [true, "Description cannot be empty"]
    },
    price: {
        type: Number,
        // required: [true, "Price cannot be empty"]
    },
    image: {
        type: String,
        // required: [true, "Image cannot be empty"]
    },
    stock : {
        type : Number,
        min: 1
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
    
}, {timestamps: true})

let Product = mongoose.model('Product', ProductSchema)

module.exports = Product