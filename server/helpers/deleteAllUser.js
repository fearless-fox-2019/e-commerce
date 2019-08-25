const User = require('../models/user');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    User
      .deleteMany({})
      .then(function() {
        console.log('Users collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
