const Product = require('../models/product')

class ProductController {
    static list(req, res, next) {
        Product.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let obj = {
            img: req.file.cloudStoragePublicUrl,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            hotProducts: req.body.hotProducts
        }
        Product.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Product.findOne({_id : req.params.id})
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static updateImage(req, res, next) {
        let obj = {
            img: req.file.cloudStoragePublicUrl,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        }
        Product.findByIdAndUpdate(req.params.id, obj)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                res.status(200).json(data)
            }
        }) 
        .catch(next)
    }

    static updateWOImage(req, res, next) {
        let obj = {
            img: req.body.img,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        }
        Product.findByIdAndUpdate(req.params.id, obj)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                res.status(200).json(data)
            }
        }) 
        .catch(next)
    }

    static updateStock(req, res, next) {
        let obj = {
            stock: req.body.stock,
        }
        Product.findByIdAndUpdate(req.params.id, obj, {new: true})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                res.status(200).json(data)
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}
module.exports = ProductController