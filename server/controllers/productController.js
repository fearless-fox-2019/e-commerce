const Product = require('../models/product')

class productController{
    static newProduct(req, res, next){    
        const {productname, price, qty} = req.body
        const newProduct = {productname, price, qty, image : req.file.cloudStoragePublicUrl, UserId : req.decoded.id}
        Product.create(newProduct)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static getAllProducts(req, res, next){
        console.log(req.query.search);
        if(req.query.search){
            Product.find({$or : [
                {productname: req.query.search },
                {category : {$in : req.query.search}}]})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
        } else {
            Product.find({qty : {$gt : 0}}).sort({createdAt : -1})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
        }
        
    }

    static deleteProduct(req, res, next){
        let id = req.params.id
        Product.deleteOne({_id : id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static listNew(req, res, next){
        Product.find({}).sort({'createdAt' : -1}).limit(4)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getOneProducts(req, res, next){
        Product.findById(req.params.id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            }
            else {
                throw{
                    code : 404
                }
            }
        })
        .catch(next)
    }
}

module.exports = productController