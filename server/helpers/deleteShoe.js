const Shoe = require('../models/shoes')

module.exports = function(done) {
  Shoe.deleteMany()
    .then((data)=> {
      console.log('deleted Shoes')
      done()
    })
    .catch((error) => {
      console.log(error)
    })
}