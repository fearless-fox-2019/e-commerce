const Product = require('../models/product')
const Cart = require('../models/cart')

class ProductController {

    static create(req, res, next) {
        // console.log(req.file, 'req.file <<<<<<<<<<<<')
        // console.log(req.body, 'req.body <<<<<<<<<<<<')
        Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                amount: req.body.amount,
                featured_image: req.file.cloudStoragePublicUrl
            })
            .then(product => {
                // console.log(product)
                res.status(201).json(product)
            })
            .catch(next)
    }

    static getAllproducts(req, res, next) {
        Product.find()
            .then(products => {
                // console.log(products)
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Product.findById(req.params.productId)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        Product.updateOne({
                _id: req.params.productId
            }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    amount: req.body.amount
                }
            })
            .then(rowUpdated => {
                // console.log(rowUpdated, 'masuk ke update <<<<<<<<<<<<<<<<<<')
                res.status(200).json(rowUpdated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Product.deleteOne({
                _id: req.params.productId
            })
            .then(rowDeleted => {
                return Cart.deleteMany({
                    productId: req.params.productId
                })
            })
            .then(deletedRow => {
                res.status(200).json(deletedRow)
            })
            .catch(next)
    }

}

module.exports = ProductController