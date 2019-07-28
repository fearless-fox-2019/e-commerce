const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"]
    }
});


const Item = mongoose.model("item", itemSchema);

module.exports = Item;