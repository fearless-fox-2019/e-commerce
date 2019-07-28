const Item = require("../models/item");


class ItemController{
    static create(req, res, next){
        if(req.file == undefined){
            next({code: 400, message: "File is required"});
        }

        const itemData = {
            name: req.body.name,
            image: req.file.gcsUrl,
            price: req.body.price,
            stock: req.body.stock
        }

        Item.create(itemData)
            .then((newItem) => {
                console.log(`>>> ITEM CREATED [${newItem.name} on ${new Date()}]`);
                res.status(201).json({ message: "Item has been created", id: newItem._id });
            })
            .catch((err) => {
                next(err);
            });
    }

    static update(req, res, next){
        
        Item.findByIdAndUpdate(req.params.id, {...req.body, ...req.file}, {runValidators: true, new: true})
            .then((updatedItem) => {
                console.log(`ITEM UPDATED [${updatedItem.name} on ${new Date()}]`);
                res.status(200).json({ message: "Item has been updated" });
            })
            .catch((err) => {
                next(err);
            });

    }

    static findById(req, res, next){

        Item.findById(req.params.id)
            .then((item) => {
                console.log(`ITEM SEARCHED BY ID [${req.params.id} on ${new Date()}]`);
                res.status(200).json({ message: "Succeed", data: {item} });
            })
            .catch((err) => {
                next(err);
            });

    }

    static findAll(req, res, next){

        Item.find()
            .then((items) => {
                console.log(`ITEMS SEARCHED [${new Date()}]`);
                res.status(200).json({message: "Succeed", data: items});
            })
            .catch((err) => {
                next(err);
            });

    }

    static delete(req, res, next){

        Item.findByIdAndDelete(req.params.id)
            .then((deletedItem) => {
                console.log(`ITEM DELETED [${deletedItem.id} on ${new Date()}]`);
                res.status(200).json({messsage: "Succeed", data: deletedItem});
            })
            .catch((err) => {
                next(err);
            })

    }

}


module.exports = ItemController;