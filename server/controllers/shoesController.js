const Shoes = require('../models/shoes')

class ShoeController {
  static create(req,res,next) {
    Shoes.create(req.body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static findAll(req,res,next) {
    Shoes.find()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static shoeDetail(req,res,next) {
    Shoes.findById(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req,res,next) {
    console.log('halo ini update')
    Shoes.findById(req.params.id)
      .then((data) => {
        console.log('masuk ke update')
        data.name = req.body.name
        data.price = req.body.price
        data.quantity = req.body.quantity
        data.description = req.body.description
        data.image = req.body.image
        return data.save()
      })
      .then((updated) => {
        console.log(updated, 'ini controller updated')
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static delete(req,res,next) {
    Shoes.findByIdAndDelete(req.params.id)
      .then((deleted) => {
        console.log(deleted)
        res.status(200).json(deleted)
      })
      .catch(next)
  }

  
}

module.exports = ShoeController