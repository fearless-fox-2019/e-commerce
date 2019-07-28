const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: [true, "size is empty"]
    },
    ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})


module.exports = mongoose.model("Size", sizeSchema)