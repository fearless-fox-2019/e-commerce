const itemModel = require('../models/itemModel')

class ItemController {
    static findAll(req, res, next) {
        itemModel
            .find()
            .then(allItem => {
                res.status(200).json(allItem)
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        let itemId = req.params.itemId

        itemModel
            .findById(itemId)
            .then(item => {
                res.status(200).json(item)
            })
            .catch(next)
    }
    static search(req, res, next) {

    }
    static searchByName(req, res, next) {
        let query = req.query.name.toLowerCase()

        itemModel
            .find({
                itemname: {
                    $regex: new RegExp(`.*${query}.*`, "i")
                }
            })
            .then(foundItem => {
                res.status(200).json(foundItem)
            })
            .catch(next)
    }
    static searchByTag(req, res, next) {
        let query = req.query.tag;

        itemModel
            .find({
                tags: {
                    $in: query
                }
            })
            .then(foundTags => {
                res.status(200).json(foundTags)
            })
            .catch(next)
    }
    static searchByCategory(req, res, next) {
        let query = req.query.category;

        itemModel
            .find({
                category: {
                    $in: query
                }
            })
            .then(foundCategory => {
                res.status(200).json(foundCategory)
            })
            .catch(next)
    }
    static create(req, res, next) {
        console.log('masuk create')
        let {
            itemname,
            description,
            price,
            stock,
            tags,
            category
        } = req.body
        console.log(req.body, 'ini reqbody yahhh')
        let cloudStoragePublicUrl = ''
        if (req.file) {
            cloudStoragePublicUrl = req.file.cloudStoragePublicUrl
        }
        tags = tags.split(',')
        tags = [...new Set(tags)]
        category = category.split(',')
        category = [...new Set(category)]

        let newItem = {
            itemname,
            description,
            image: cloudStoragePublicUrl,
            price,
            stock,
            tags,
            category
        }
        console.log(newItem, 'ini new Item')
        itemModel
            .create(newItem)
            .then(created => {
                res.status(200).json(created)
            })
            .catch(next)
    }
    static update(req, res, next) {
        let itemId = req.params.itemId

        let {
            itemname,
            description,
            price,
            stock,
            tags,
            category,
            rate
        } = req.body
        console.log(req.file,'ini req file')
        tags = tags.split(',')
        tags = [...new Set(tags)]
        category = category.split(',')
        category = [...new Set(category)]
        let cloudStoragePublicUrl = ''
        if (req.file) { cloudStoragePublicUrl = req.file.cloudStoragePublicUrl }
        let update = {
            image: cloudStoragePublicUrl
        }
        if (itemname) { update.itemname = itemname }
        if (description) { update.description = description }
        if (price) { update.price = price }
        if (stock) { update.stock = stock }
        if (tags) { update.tags = tags }
        if (category) { update.category = category }
        if (rate) { update.rate = rate }

        console.log(update,'ini update yaa')

        itemModel
            .findByIdAndUpdate(itemId,update,{new:true})
            .then(updated => {
                console.log(updated)
                res.status(200).json(updated)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        let itemid = req.params.itemId

        itemModel
            .findByIdAndDelete(itemid)
            .then(deleted => {
                console.log(deleted)
                res.status(200).json(deleted)
            })
            .catch(next)
    }
}

module.exports = ItemController