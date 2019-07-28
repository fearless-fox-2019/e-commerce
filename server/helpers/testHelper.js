const User = require('../models/users')
const Product = require('../models/products')
const Transaction = require('../models/transactions')
const Cart = require('../models/carts')
module.exports = {
  removeAllUser: async function() {
    if(process.env.NODE_ENV == 'test') await User.deleteMany({})
  },
  removeAllTransaction: async function() {
    if(process.env.NODE_ENV == 'test') await Transaction.deleteMany({})
  },
  removeAllCart: async function() {
    if(process.env.NODE_ENV == 'test') await Cart.deleteMany({})
  },
  addUser: async function() {
    if(process.env.NODE_ENV == 'test') {
      await User.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'password',
        role: 'admin'
      })

      await User.create({
        username: 'mantap',
        email: 'mantap@mail.com',
        password: 'password'
      })
    }
  },
  removeAllProducts: async function() {
    if(process.env.NODE_ENV == 'test') await Product.deleteMany({})
  },
  addProduct: async function() {
    if(process.env.NODE_ENV == 'test') {
      const data = {
        name: 'kaos',
        description: 'kaos tapi celana',
        price: 70000,
        stock: 100
      }
      let product = await Product.create(data)
      return product._id
    }
  }
}