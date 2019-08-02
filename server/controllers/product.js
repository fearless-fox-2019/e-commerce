const Product = require('../models/product')

class ProductController{
    static getAll(req, res){
        Product.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err) //error status 500
        })
    }
    static findOneDetails(req, res){
        Product.findById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static create(req, res){
        const {productname, price, stock, category, description} = req.body
        const newData = {productname, price, stock, image: req.file.cloudStoragePublicUrl, category, description}
        Product.create(newData)
        .then(response => {
            console.log(response)
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
    static update(req, res){
        let data = {}
        
        // if true -> jalanin true || iif false yaudah deh
        req.body.productname && (data.productname = req.body.productname)
        req.body.price && (data.price = req.body.price)
        req.body.stock && (data.stock = req.body.stock)
        req.body.image && (data.image = req.body.image)
        req.body.category && (data.category = req.body.category)
        req.body.description && (data.description = req.body.description)

        Product.findByIdAndUpdate(req.params.id, data) //ganti findByIdAndUpdate (id, data)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(response)
        })
    }
    static delete(req, res){
        Product.findByIdAndDelete(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

}

module.exports = ProductController