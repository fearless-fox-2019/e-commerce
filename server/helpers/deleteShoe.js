const Shoe = require('../models/shoes')

module.exports = function(done) {
  Shoe.deleteMany()
    .then((data)=> {
      console.log('deleted Shoes')
    })
    .catch((error) => {
      console.log(error)
    })
}