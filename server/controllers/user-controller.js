const User = require('../models/user');
const Helper = require('../helpers/helper.js');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static signup(req, res, next) {
    User.create(req.body)
      .then(user => {
        console.log(user);
        const myToken = Helper.generateJWT({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        })
        console.log(myToken)
        res.status(200).json({ token: myToken, name: user.name, id: user._id, email: user.email, isAdmin: user.isAdmin })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) throw { status: 404, message: 'Your email or password wrong' };
        else if (!Helper.comparePassword(password, user.password)) throw { status: 404, message: 'Your email or password wrong' };
        else {
          const myToken = Helper.generateJWT({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          })
          res.status(200).json({ token: myToken, name: user.name, id: user._id, email: user.email, isAdmin: user.isAdmin })
        }
      })
      .catch(next)
  }

  static googleSignin(req, res, next) {
    console.log('masok')
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let { name, email } = {}
    client.verifyIdToken({
      idToken: req.headers.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        name = ticket.getPayload().name
        email = ticket.getPayload().email
        return User.findOne({ email })
      })
      .then(user => {
        if (user) return user
        else {
          let password = Helper.generatePassword()
          return User.create({ name, email, password })
        }
      })
      .then(user => {
        const myToken = Helper.generateJWT({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
        res.status(200).json({ token: myToken, name: user.name, id: user._id })
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    console.log(req.params.id);
    User.findById(req.params.id)
      .then(user => {
        if (user) res.status(200).json(user);
        else res.status(400).json('User not found');
      })
      .catch(next)
  }

  static update(req, res, next) {
    let obj = {}
    for (let key in req.body) {
      obj[key] = req.body[key]
    }
    User.findOneAndUpdate({ _id: req.params.id }, obj, { new: true })
    .then(user => res.status(200).json(user))
    .catch(next)
}
}

module.exports = UserController