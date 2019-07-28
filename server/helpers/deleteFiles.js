const {User, Product, Cart} = require('../models/index');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    User.deleteMany({})
      .then(function() {
        console.log('Users collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
    Product.deleteMany({})
      .then(function() {
        console.log('Products collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
    Cart.deleteMany({})
      .then(function() {
        console.log('Carts collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
