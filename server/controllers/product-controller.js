const Product = require('../models/product');

class ProductController {
  static findAll(req, res, next) {
    Product.find()
    .then((products) => res.status(200).json(products))
    .catch(next);
  }

  static findOne(req, res, next) {
    Product.findById(req.params.id)
      .then(product => res.status(200).json(product))
      .catch(next)
  }

  static create(req, res, next) {
    const { name, price, stock, category, detail } = req.body
    console.log(req.body);
    console.log(req.file);
    const image = req.file ? req.file.cloudStoragePublicUrl : ''
    const categories = ['table', 'drawer']

    if (categories.includes(category)) {
        Product.create({
          name,
          price,
          detail,
          stock,
          category,
          image
        })
        .then(product => res.status(201).json(product))
        .catch(next);
    }
    else throw { status: 400, message: 'Invalid category' }
  }

  // static findOneAndNext(req, res, next) {
  //   Product.findById(req.params.id)
  //     .then(product => product ? (req.headers.image = product.image, next()) : false)
  //     .catch(next)
  // }
  static update(req, res, next) {
    let obj = {}
    for(let key in req.body) {
      obj[key] = req.body[key]
    }
    req.file ? obj.image = req.file.cloudStoragePublicUrl : false

    Product.findByIdAndUpdate(req.params.id, obj, { new:true })
    .then(product => res.status(200).json(product))
    .catch(next);
  }

  static destroy (req, res, next) {
    Product.findByIdAndDelete(req.params.id)
    .then(product => product ? res.status(200).json(product) : res.status(400).json('Product not found'))
    .catch(next);
  }
}

module.exports = ProductController
