const User = require('../models/user')
const Product = require('../models/product')

module.exports = {
  deleteUserData(done){
    if (process.env.NODE_ENV === 'test') {
      User
        .deleteMany({})
        .then(function() {
          console.log('User data test collection cleared!');
          done()
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  deleteProductData(done){
    if (process.env.NODE_ENV === 'test') {
      Product
        .deleteMany({})
        .then(function() {
          console.log('User data test collection cleared!');
          done()
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  }
  
}