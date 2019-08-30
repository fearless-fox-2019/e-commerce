const Product = require('../models/products')

class ControllerProduct {
  static findAll(req, res, next) { 
    Product.find()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    
    let {name, description, price, stock} = req.body
    // if(price && typeof price === 'string') {
    //   throw {status: 400, message: 'price must be a number !'}
    // }
    // if(stock && typeof stock === 'string') {
    //   throw {status: 400, message: 'stock must be a number !'}
    // }
    let input = {name, description, price, stock}
    if(req.file && req.file.gcsUrl) {
      input.image = req.file.gcsUrl
    }
    Product.create(input)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let {name, description, price, stock} = req.body
    if(!name) {
      throw {status: 400, message: 'name required !'}
    }
    if(!description) {
      throw {status: 400, message: 'description required !'}
    }
    if(!price) {
      throw {status: 400, message: 'price required !'}
    }
    if(!stock) {
      throw {status: 400, message: 'stock required !'}
    }
    let input = {name, description, price, stock}

    if(req.file && req.file.gcsUrl) {
      input.image = req.file.gcsUrl
    }

    Product.updateOne({_id: req.params.id}, input)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    Product.findById(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
  
  static delete(req, res, next) {
    Product.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerProduct