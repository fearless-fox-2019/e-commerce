const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    productCart: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    userCart: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    selectedSize : {
        type : String
    },
}, {timestamps: true})


module.exports = mongoose.model("Cart", cartSchema)