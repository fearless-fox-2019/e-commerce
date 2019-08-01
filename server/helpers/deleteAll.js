const Game = require('../models/game');
const User = require('../models/user')

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Promise.all([User.deleteMany({}),Game.deleteMany({})])
    .then(() => {
      console.log('Success clear User')
      console.log('Success clear Game')
      done()
    })
    .catch(err => {
      console.log(err)
    })
    // User.deleteMany({})
    // .then(() => {
    //   console.log('User collection cleared!')
    //   done()
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    // Game
    //   .deleteMany({})
    //   .then(function() {
    //     console.log('Game collection cleared!');
    //     done()
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  }
}