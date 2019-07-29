const Product = require('../models/product');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    Product
      .deleteMany({})
      .then(function() {
        console.log('Products collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
