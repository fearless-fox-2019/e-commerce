const Cart = require('../models/carts')

module.exports = async (req, res ,next) => {
  try {
    const { cart } = req.body
    const result = await Cart.findById(cart)
    if(result) {
      result.status = true
      await result.save()
      next()
    } else {
      next({status: 404, resource: 'cart'})
    }
  } catch (error) {
    next({status: 404, resource: 'cart'})
  }
  
}