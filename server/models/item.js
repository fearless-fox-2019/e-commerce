const mongoose = require("mongoose");
const {Schema} = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Item's name is required"],
        validate: [{
            validator: function isValid(value){
                if(value.length < 3){
                    return false;
                }else{
                    return true;
                }
            }, message: "Item's name must be more than 2 characters"
        }]
    },
    description: {
        type: String,
        required: [true, "Item's description is required"]
    },
    price: {
        type: Number,
        required: [true, "Item's price is required"],
        validate: {
            validator: function isValid(value){
                if(value < 0){
                    return false;
                }else{
                    return true;
                }
            }
        }
    },
    stock: {
        type: Number,
        required: [true, "Item's stock is required"],
        validate: {
            validator: function isValid(value){
                if(value < 0){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;