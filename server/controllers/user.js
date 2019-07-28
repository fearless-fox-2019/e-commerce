const User = require('../models/user');
const { compareHash } = require('../helpers/bcrypt');
const { sign } = require('../helpers/token');

class ControllerUser {

  static signUp(req, res, next) {
    User.create(req.body)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static signIn(req, res, next) {
    User.findOne({
      email : req.body.email
    })
    .then((found) => {
      if (found) {
        if (compareHash(req.body.password, found.password)) {
          const token = sign({
            id: found._id,
            email : found.email
          }, process.env.SECRET_TOKEN);
          res.status(200).json({
            token,
            fullname : found.fullname,
            email : found.email
          })
        } else {
          throw {
            status : 401,
            message : 'Invalid Username or Password'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'Invalid Username or Password'
        }
      }
    })
    .catch(next)
  }

  static all(req, res, next) {
    User.find()
    .sort([['createdAt', 1]])
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static getCart(req, res, next) {
    User.findById(req.decoded.id)
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static addToCart(req, res, next) {
    // console.log(req.body.product);
    User.updateOne({
      _id: req.params.id
    }, {
      $push: {
        cart: req.body.product
      }
    })
    .then((updated) => {
      // console.log('Habis Update', updated);
      res.status(200).json(updated)
    })
    .catch(next)
  }

  static removeFromCart(req, res, next) {
    console.log(req.body);
    User.updateOne({
      _id: req.params.id
    }, {
      $pull: {
        cart: {
          _id: req.body.id
        }
      }
    })
    .then((removed) => {
      res.status(200).json(removed)
    })
    .catch(next)
  }
}

module.exports = ControllerUser
