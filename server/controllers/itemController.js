const Item= require('../models/item')


class itemController{

    static create(req, res, next){
        console.log({...req.body})
        let newItem= new Item({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl,
            price: req.body.price,
            stock: req.body.stock,
        })

        newItem.save()
        .then(item=>{
            res.status(201).json(item)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static findAll(req, res, next){
        Item.find({})
        .then(items=>{
            res.status(200).json(items)
        })
        .catch(next)
    }

    static findCategory(req, res, next){
        Item.find({category: req.params.category})
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            consoler.log(err)
            next(err)
        })
    }

    static findOne(req, res, next){
        
        Item.findById(req.params.id)
        .then(item=>{
            if(item){
                res.status(200).json(item)
            }else{
                res.status(404).json({message: 'Item Not Found!'})
            }
        })
        .catch(next)
    }

    static updateItem(req, res, next){

        console.log('masuk update item')
        console.log(req.body.name, 'ini req.body.name')

        Item.findById(req.params.id)
        .then(item =>{
            console.log('ini datanya', item)
            if(req.file){
                item.name= req.body.name || item.name
                item.category= req.body.category || item.category
                item.image= req.file.cloudStoragePublicUrl
                item.description= req.body.description || item.description
                item.price= req.body.price || item.price
                item.stock= req.body.stock || item.stock

            }else{
                item.name= req.body.name || item.name
                item.category= req.body.category || item.category
                item.image= item.image
                item.description= req.body.description || item.description
                item.price= req.body.price || item.price
                item.stock= req.body.stock || item.stock

                
            }
            return item.save()
        })
        .then(newItem => {
            console.log('sukses update', newItem)
            res.status(200).json(newItem)
        })
        .catch(next)
    }

    static updateStock(req, res, next){
       
        Item.findById(req.params.id)
        .then(item => {
            if(item != {}){
                let newStock= item.stock- req.body.quantity
                return Item.findByIdAndUpdate(req.params.id, {stock: newStock},{new: true})
            }else{
                throw {code: 404, message: 'Item Not Found'}
            }
            
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static remove(req, res, next){
        Item.findById(req.params.id)
        .then(item=>{
            if(item){
                Item.deleteOne({_id: item._id})
                .then(() =>{
                    res.status(200).json(item)
                })
                .catch(next)

            }else{
                throw {code: 404, message: 'Item Not Found'}
            }
        })
        .catch(err =>{
            next(err)
        })
    }

}

module.exports= itemController