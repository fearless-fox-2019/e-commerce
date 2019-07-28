const Product = require('../models/product')
const Size = require('../models/size')
const User = require('../models/user')
class ControllerProduct {
    static create(req, res, next) {
        // console.log(req.body.size)
        let arr = req.body.size.split(",")
        // console.log(arr)
        var m = new Product;
        m.size = arr
        // console.log(m)
        const { price, image, color, description, name, stock } = req.body
        let input = { price, image, color, description, name, stock }
        console.log(input.image)
        input.size = m.size
        // console.log(req.headers.decoded)
        // input.author = req.headers.decoded._id
        // console.log(input)

        // res.send(input)
        Product.create(input)
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next)
    }
    static addSize(req, res, next) {
        // console.log(req.body.size)
        // console.log(m)
        const { size, ProductId } = req.body
        let input = { size, ProductId }
        console.log(req.headers.decoded)
        input.UserId = req.headers.decoded._id
        // res.send(input)
        Size.create(input)
            .then((size) => {
                res.status(201).json(size)
            })
            .catch(next)
    }
    static get(req, res, next) {
        Product.find()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Product.findById(req.params.id)
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then((product) => {
                res.status(200).json({
                    message: `berhasil terdelete pada id ${req.params.id}`
                })
            })
            .catch(next)
    }
    static updateStock(req, res, next) {
        
        Product.findById(req.params.id)
            .then((product) => {
                product.stock = req.body.stock
                product.save()
                .then(product=>{
                    res.status(201).json(product)
                })
                .catch(next)
            })

            .catch(next)
    }
    static update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next)
    }
}
module.exports = ControllerProduct