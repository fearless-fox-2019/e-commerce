const Item = require("../models/item");


class ItemController{

    static create(req, res, next){
        Item.create(req.body)
            .then((newItem) => {
                res.status(201).json(newItem);
            })
            .catch((err) => {
                next(err);
            })
    }

    static findAll(req, res, next){
        Item.find()
            .then((items) => {
                res.status(200).json(items);
            })
            .catch((err) => {
                next(err);
            });
    }

    static findById(req, res, next){
        Item.findById(req.params.id)
            .then((item) => {
                res.status(200).json(item);
            })
            .catch((err) => {
                next(err);
            })
    }

    static update(req, res, next){
        Item.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
            .then((item) => {
                res.status(200).json(item);
            })
            .catch((err) => {
                next(err);
            })
    }

}

module.exports = ItemController;