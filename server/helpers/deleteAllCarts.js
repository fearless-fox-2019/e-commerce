const Cart = require('../models/cart');

module.exports = function() {
if (process.env.NODE_ENV === 'test') {
    Cart
        .deleteMany({})
        .then(function() {
            console.log('Carts collection cleared!');
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}