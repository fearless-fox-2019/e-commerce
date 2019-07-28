const User = require('../models/cart')

module.exports = function(done) {
  User.deleteMany()
    .then((data) => {
      console.log('deleted');
      done()
    })
    .catch((err) => {
      console.log(err)
    })
}