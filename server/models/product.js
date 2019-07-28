const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is empty"]
    },
    description: {
        type: String,
        required: [true, "description is empty"]
    },
    image: {
        type: String,
        required: [true, "image is empty"]
    },
    userCart: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    size: [{
        type: String
    }],
    selectedSize: {
        type: String
    },
    color: {
        type: String,
        required: [true, "every product have color!"]
    },
    price: {
        type: String,
        required: [true, "every product have price!"]
    },
    stock: {
        type: Number
    }
}, { timestamps: true })
let stockBefore
productSchema.pre('save', function (next) {
    // do stuff
    console.log("update stock")
    const Product = this.constructor
    Product.findById(this._id)
        .then(data => {
            if(data){
                stockBefore = data.stock
                console.log(this.stock, "update")
                console.log(data.stock, "data sebelum")
                if (this.stock > data.stock) {
                    console.log(this.stock,"stock update")
                    next(({
                        message: 'you buying more than stock',
                        code: 400
                    }))
                }else{
                    this.stock = data.stock-this.stock
                    next()
                }
            }else {
                next()
            }
        })
    // next();
});
module.exports = mongoose.model("Product", productSchema)