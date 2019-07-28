const Product = require('../models/product');

class ControllerProduct {
  
  static createTest(req, res, next) {
    const newProduct = {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      quantity: req.body.quantity,
      price: req.body.price,
      // picture: req.file.cloudStoragePublicUrl,
    }
    Product.create(newProduct)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static create(req, res, next) {
    const newProduct = {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      quantity: req.body.quantity,
      price: req.body.price,
      picture: req.file.cloudStoragePublicUrl,
    }
    Product.create(newProduct)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static all(req, res, next) {
    Product.find()
    .sort([['updatedAt', -1]])
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }
  
  static destroy(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
    .then((destroyed) => {
      res.status(200).json(destroyed)
    })
    .catch(next)
  }

  static update(req, res, next) {
    Product.findById(req.params.id)
    .then((updated) => {
      updated.productName = req.body.productName;
      updated.productDescription = req.body.productDescription;
      updated.quantity = req.body.quantity;
      updated.price = req.body.price;
      updated.picture = req.file.cloudStoragePublicUrl
      updated.updatedAt = new Date()
      updated.save()
      res.status(201).json(updated)
    })
    .catch(next)
  }
}

module.exports = ControllerProduct
