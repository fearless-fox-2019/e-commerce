const Product = require('../models/product')

class ProductController {
    static create(req, res, next) {
        let input = {
            ...req.body,
            image_path: req.file.gcsUrl
        }
        Product.create(input)
            .then( data => {
                res.status(201).json(data)
            })
            .catch( err => next(err) )
    } 

    static findAll(req, res, next) {
        Product.find()
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )

    }

    static findOne(req, res, next) {
        Product.findById(req.params.productId)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )

    }

    static replace(req, res, next) {
        Product.findByIdAndUpdate(req.params.productId, req.body)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }

    static update(req, res, next) {
        Product.findByIdAndUpdate(req.params.productId, req.body, {runValidators: true, new: true})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }

    static deleteOne(req, res, next) {
        Product.findByIdAndDelete(req.params.productId, req.body)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => next(err) )
    }
}

module.exports = ProductController