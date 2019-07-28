const User = require('../models/users')

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