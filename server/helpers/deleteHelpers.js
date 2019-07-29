let User = require('../models/user')
let Product = require('../models/product')
// let Transaction = require('../models/model-transaction')

module.exports = {
  deleteUserTesting() {
    if (process.env.NODE_ENV == 'test') {
      User.deleteOne({username: 'testing'})
        .then(() => {
          console.log('User data cleared');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  deleteProductTesting() {
    if (process.env.NODE_ENV == 'test') {
      Product.deleteMany({ category: 'testing' })
        .then(() => {
          console.log('Product data cleared');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
//   deleteTransaction() {
//     if (process.env.NODE_ENV == 'test') {
//       Transaction.deleteMany({})
//         .then(() => {
//           console.log('transaction cleared');
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   },
}