const Product = require('../models/product')

module.exports = function () {
    // if (process.env.NODE_ENV == 'test') {
    Product.deleteMany({})
        .then(() => {
            console.log('All products cleared!')
        })
        .catch(err => {
            console.log(err)
        })
    // }
}