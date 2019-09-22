const User = require('../models/users')
const comparePassword = require('../helpers/comparePassword')
const getToken = require('../helpers/getToken')
const getPassword = require('../helpers/getPassword')

class ControllerUser {
  static findAll(req, res, next) {
    User.find()
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    const { email, password, username } = req.body
    const input = { email, password, username }
    if(req.body.role) {
      input.role = req.body.role
    }
    User.create(input)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const input = { email, password }
    User.findOne({email: input.email})
    .then(user => {
      if(user){
        let check = comparePassword(user.password, input.password)
        if(check) {
          let payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
          }
          let token = getToken(payload)
          res.json({token, payload})
        } else {
          throw {status: 400, message: 'wrong email / password'}
        }
      } else {
        
        throw {status: 400, message: 'wrong email / password'}
      }
    })
    .catch(next)
  }

}

module.exports = ControllerUser