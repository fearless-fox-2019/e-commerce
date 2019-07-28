const Product = require('../models/product')

class ProductController {
    static create (req, res, next){
        // console.log('ini req file', req.file.cloudStoragePublicUrl)
        let input = {
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            image: req.file.cloudStoragePublicUrl,
            stock: req.body.stock,
        }
        Product.create(input)
            .then((Product)=>{
                res.status(201).json(Product)
            })
            .catch(next)
    }

    static findAll (req, res, next){
        Product.find()
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static allUserProduct (req, res, next){
        Product.find({
            UserId : {$nin: [`${req.user._id}`] }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete (req, res, next){
        Product.deleteOne({
            _id : req.params.id
        })
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne (req, res, next){
        Product.findOne({
            _id : req.params.id
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update (req, res, next){
        let input = {
            title : req.body.title,
            content : req.body.content,
            created_at : new Date(),
            fileUrl: req.file.cloudStoragePublicUrl,
            UserId : req.user._id
        }
        Product.updateOne({_id: req.params.id}, input)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ProductController