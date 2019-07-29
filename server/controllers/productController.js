const product = require('../models/product')


class productController{
    
    static registerProduct(req, res, next){
        console.log('masuk ke create product')
        let newProduct = {
            name : req.body.name,
            description : req.body.description,
            image : req.body.image,
            price : req.body.price,
            stock : req.body.stock
        }
        product.create(newProduct)
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch(next)
    }

    static getAll(req, res, next){
        product.find({})
        .then((products)=>{
            res.status(200).json(products)
        })
        .catch(next)
    }

    static getOne(req, res, next){
        product.findById(req.params.id)
        .then((found)=> {
            res.status(200).json(found)
        })
        .catch(next)
    }

    static updateProduct(req, res, next){
        product.findById(req.params.id)
        .then(product =>{
            if(product){
                product.name= req.body.name || product.name
                product.description= req.body.description || product.description
                product.image= req.file.cloudStoragePublicUrl
                product.price= req.body.price || product.price
                product.category= req.body.category || product.category
                product.stock= req.body.stock || product.stock
            }else{
                res.status(404).json('Update - product Not Found')
            }
            return product.save()
        })
        .then(newproduct => {
            console.log('Updated Product : ', newproduct)
            res.status(200).json(newproduct)
        })
        .catch(next)
    }

    static updateStock(req, res, next){
        product.findById(req.params.id)
        .then(product => {
            if(product != {}){
                let newStockQuantity = product.stock - req.body.quantity
                return product.findByIdAndUpdate(req.params.id, {stock: newStockQuantity},{new: true})
            }else{
                res.status(404).json('product Not Found')
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next){
        let id = req.params.id
        product.findById(id)
        .then((article)=>{
            if(!article){
                res.status(404).json('Not Found')
            }else{
                return product.deleteOne({_id : id})
            }
        })
        .then((data)=>{
            res.status(200).json({ message : 'Delete success'})
        })
        .catch(next)
    }

}


 module.exports = productController