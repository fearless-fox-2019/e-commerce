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
        res.staus(200).json(data)
      })
      .catch(next)
  }

  
}

module.exports = ShoeController