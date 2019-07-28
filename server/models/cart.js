const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Customer Id is required"]
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "item"
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    status: {
        type: String
    },
    paidDate: {
        type: Date
    }
});

cartSchema.pre("save", function setStatus(next){
    if(this.isNew){
        this.status = "open";
        next();
    }else{
        next();
    }
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;