const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    Item: Array
})

module.exports = model('Cart', cartSchema)