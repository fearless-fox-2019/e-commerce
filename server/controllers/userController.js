const { userModel } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign, decodeId } = require('../helpers/jwtoken')
// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.GOOGLE_API_KEY)

class UserController {
  static signup(req, res, next) {
    let { username, email, password, name } = req.body
    let newUser = { username, email, password, name, cart: [] }
    userModel
      .create(newUser)
      .then((newUser) => {
        let payload = {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
        let token = sign(payload)
        res.status(201).json({ token })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    let { username, password } = req.body
    userModel
      .findOne({
        username: username
      })
      .then((found) => {
        if (found) {
          if (compare(password, found.password)) {
            let payload = {
              _id: found._id,
              username: found.username,
              email: found.email
            }
            let token = sign(payload)
            res.status(200).json({ token })
          }
          else {
            throw `Invalid username / password`
          }
        }
        else {
          throw `Invalid username / password`
        }
      })
      .catch(next)
  }

  static cart(req, res, next) {
    let x = req.headers.token
    let user = decodeId(x)
    userModel.updateOne({_id : user._id},req.body)
    .then(()=>{
      res.status(200).json({
        msg : 'berhasil update'
      })
    })
    .catch(next)
  }

  static findById (req , res , next) {
    let x = req.headers.token
    let user = decodeId (x)
    userModel.findById(user._id).populate({path:'cart'})
    .then((data)=>{
      res.status(200).json({
        data
      })
    })
    .catch(next)
  }
  // static googleLogin(req, res, next) {
  //   client
  //     .verifyIdToken({
  //       idToken: req.body.id_token,
  //       audience: process.env.GOOGLE_API_KEY
  //     })
  //     .then((ticket) => {
  //       const { email } = ticket.getPayload()
  //       let newUserInfo = {
  //         username: req.body.username,
  //         email: email,
  //         password: 'google',
  //         profpic: req.body.profpic || null
  //       }
  //       userModel.findOne({ email: email })
  //         .then((user) => {
  //           if (user) {
  //             let payload = {
  //               _id: user._id,
  //               username: user.username,
  //               email: user.email
  //             }
  //             let token = sign(payload)
  //             res.status(200).json({
  //               token: token
  //             })
  //           } else {
  //             userModel
  //               .create(newUserInfo)
  //               .then((newUser) => {
  //                 let payload = {
  //                   _id: newUser._id,
  //                   username: newUser.username,
  //                   email: newUser.email
  //                 }
  //                 let token = sign(payload)
  //                 res.status(200).json({
  //                   token: token
  //                 })
  //               })
  //               .catch(next)
  //           }
  //         })
  //     })
  //     .catch(next)
  // }
}

module.exports = UserController