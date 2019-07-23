const Product = require('../models/product')
// console.log('control prods')
class ProductController {
    static create(req, res){
        // console.log('create controller');
        Product.create({
            itemName : req.body.itemName,
            stock : req.body.stock,
            price : req.body.price,
            img : req.body.img || req.file.cloudStoragePublicUrl,
            description : req.body.description
        })
            .then(product => {
                // console.log('berhasil', product)
                res.status(201).json(product)
            })
            .catch(err => {
                // console.log('ini error', err)
                res.status(500).json(err)
            })
    }
    static readAll(req, res){
        Product.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static detail(req, res){
        Product.findById(req.params.id)
            .then(product => {
                if(product){
                    res.status(200).json(product)
                } else {
                    res.status(404).json(product)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res){
        let obj = {}
        let {itemName, stock, img, price, description} = req.body
        
        if(req.file){
            if( req.file.cloudStoragePublicUrl) img =  req.file.cloudStoragePublicUrl
        }
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        if(itemName) obj.itemName = itemName
        if(stock) obj.stock = stock
        if(price) obj.price = price
        if(img) obj.img = img
        if(description) obj.description = description
        
        // console.log('obj: ', obj);
        Product.findByIdAndUpdate(req.params.id, obj)
            .then(update => {
                res.status(200).json(update)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res){
        Product.findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController