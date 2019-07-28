const Cart = require('../models/carts')
const checkDupes = require('../helpers/checkDupes')

class ControllerCart {

  static async findAll (req, res, next) {
    try {
      const carts = await Cart.findOne({user: req.user._id, status: false})
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  

  static async addToCart (req, res, next) {
    try {
      const { product } = req.body
      const cart = await Cart.findOne({
        user: req.user._id,
        status: false
      })
      if(cart) {
        const check = checkDupes(cart.products, product)
        if(check.dupes) {
          let i = check.index
          cart.products[i].total++
          cart.products[i].totalPrice += req.product.price
        } else {
          cart.products.push({
            product: req.product._id,
            total: 1,
            totalPrice: req.product.price,
            name: req.product.name,
            image: req.product.image
          })
        }
        const result = await cart.save()
        res.status(201).json(result)
      } else {
        const input = {
          products : [{
            product: req.product._id,
            total: 1,
            totalPrice: req.product.price,
            name: req.product.name,
            image: req.product.image
          }],
          user: req.user._id
        }
        const result = await Cart.create(input)
        res.status(201).json(result)
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct (req, res, next) {
    try {
      const { product } = req.body
      const productId = product
      const cart = await Cart.findById(req.params.cartId)
      const check = checkDupes(cart.products, product)
      if(check.dupes) {
        const i = check.index
        cart.products.splice(i, 1)
        const result = await cart.save()
        res.status(200).json(result)
      } else {
        return next({ status: 404, resource : 'product'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart (req, res, next) {
    try {
      const result = await Cart.deleteOne({_id : req.params.cartId})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCart