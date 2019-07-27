const Game = require('../models/game')
class GameController {

  static create(req, res, next){
    let newGame = {
      name : req.body.name,
      description : req.body.description,
      image : req.body.image,
      price : req.body.price,
      stock : req.body.stock,
      screenShots : req.body.screenShots
    }
    Game.create(newGame)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }

  static findAll(req, res, next){
    Game.find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static findOne(req, res, next){
    Game.findOne({ _id : req.params.id })
    .then(data => {
      if(!data){
        next({status : 404, message : 'game not found'})
      }
      else {
        res.status(200).json(data)
      }
    })
    .catch(next)
  }
  
  static delete(req, res, next){    
    Game.deleteOne({_id : req.params.id})
    .then(data => {
      if(data.deletedCount == 0){
        next({status : 404, message : 'game not found'})
      }
      else {
        res.status(200).json(data)
      }
    })
    .catch(next)
  }

  static updateGame(req, res, next){
    Game.updateOne({ _id : req.params.id}, req.body)
    .then(data => {
      if(data.nModified == 0){
        next({status : 404 , message : 'game not found'})
      }
      else {
        res.status(200).json(data)
      }
    })
    .catch(next)
  }
  
}

module.exports = GameController