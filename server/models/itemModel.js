const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
    itemname: {
        type: String,
        required: [true, 'required item name']
    },
    description: {
        type: String,
        required: [true, 'required item description']
    },
    image: {
        type: String,
        required: [true, 'required item image link']
    },
    price: {
        type: Number,
        required: [true, 'required item price']
    },
    stock: {
        type: Number,
        required: [true, 'required item stock']
    },
    category: [{
        type: String,
        required: [true, 'required item category']
    }],
    tags: [{
        type: String,
        required: [true, 'required item tag']
    }],
    rate: {
        point: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
},{
    timestamps: true
})

// itemSchema.pre('findOneAndUpdate', function(next){
//     let updateData = this._update
//     console.log(this._update,'ini update')
//     if(updateData.rate.point === 0 || updateData.rate.count === 0){
//         next()
//     }
//     else {
//         updateData.rate.point / updateData.rate.count
//     }
// })

let Item = mongoose.model('Item', itemSchema)

module.exports = Item