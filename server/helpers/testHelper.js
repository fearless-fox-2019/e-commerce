const User = require('../models/users')
const Product = require('../models/products')

module.exports = {
  removeAllUser: async function() {
    if(process.env.NODE_ENV == 'test') await User.deleteMany({})
  },
  addUser: async function() {
    if(process.env.NODE_ENV == 'test') {
      await User.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'password',
        role: 'admin'
      })
    }
  },
  removeAllProduct: async function() {
    if(process.env.NODE_ENV == 'test') await Product.deleteMany({})
  }
}