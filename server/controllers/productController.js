const { productModel } = require("../models")

class ProductController {
  static create(req, res, next) {
    const { name , quantity , description , price} = req.body
    let picture = null
    if(req.file) {
      picture = req.file.cloudStoragePublicUrl
    }
    productModel.create({
      name,
      quantity,
      picture,
      description,
      price
    })
      .then(function (data) {
        res.status(201).json({
          data,
          msg: 'berhasil create'
        })
      })
      .catch(next)
  }

  static read(req, res, next) {
    productModel.find().sort([['createdAt', 'desc']])
      .then(function (data) {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next) {
    productModel.update({ _id: req.params.id }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
        })
      })
      .catch(next)
  }

  static updatePut(req, res, next) {
    const { name , quantity , description , price} = req.body
    let picture = null
    if(req.file) {
      picture = req.file.cloudStoragePublicUrl
    }
    productModel.update({ _id: req.params.id },{
      name,
      quantity,
      picture,
      description,
      price
    })
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    productModel.deleteOne({ _id: req.params.id })
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil delete'
        })
      })
      .catch(next)
  }
}

module.exports = ProductController