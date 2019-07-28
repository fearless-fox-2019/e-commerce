const Product = require('../models/products')

module.exports = async (req, res ,next) => {
  try {
    const { product } = req.body
    const result = await Product.findById(product)
    if(result) {
      req.product = result
      next()
    } else {
      next({status: 404, resource: 'product'})
    }
  } catch (error) {
    next({status: 404, resource: 'product'})
  }
  
}