const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
  deleteProduct() {
    Product.deleteMany({})
    .then((deleted) => {
      console.log('Product Cleared');
    })
    .catch((err) => {
      console.log(err);
    })
  },
  deleteUser() {
    User.deleteMany({})
    .then(() =>  {
      console.log('Ciao Carl');
    })
    .catch((err) => {
      console.log(err);
    })
  }
};
