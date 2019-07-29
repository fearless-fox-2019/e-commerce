const Product = require('../models/product')

class productController {
  static create(req, res, next) {
    let newProduct = {
      name: req.body.name,
      price: req.body.price,
    }
    if (newProduct.name.length == 0) {
      next({
        code: 400,
        message: 'name must be filled!'
      })
    } else {

      if (!newProduct.price) {
        next({
          code: 400,
          message: 'Price must be filled!'
        })

      } else {

        Product.create(newProduct)
          .then(product => {
            res.status(201).json(product)
          })
          .catch(next)
      }
    }
  }

  static list(req, res, next) {
    Product.find({})
      .then(products => {
        if (products) {
          res.status(200).json(products)
        } else {
          res.status(200).json([])
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        console.log(product)
        if (product) {

          product.name = req.body.name
          product.price = req.body.price
          let updatedProduct = product
          product.save()
            .then(() => {
              res.status(200).json(updatedProduct)
            })
            .catch(next)
        } else {
          next({
            code: 404,
            message: `Product with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static delete(req, res, next) {
    Product.findById({
        _id: req.params.id
      })
      .then(product => {
        console.log(product)
        if (product) {
          return Product.deleteOne({
            _id: req.params.id
          })
        } else {
          throw next({
            code: 404,
            message: 'Product not found!'
          })
        }
      })
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(next)
  }
}


module.exports = productController