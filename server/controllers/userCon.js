const User = require('../models/user')
const { decrypt } = require("../helpers/bcryptjs")
const { sign } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {
    static signIn(req, res, next) {
        if (req.body.email && req.body.password) {
            let signInItem = {
                email : req.body.email,
                password : req.body.password
            }
            User.findOne({ email: signInItem.email })
            .then(user => {
                if (!user) {
                    next({ code: 404, resource: "User" })
                } else {
                    let checkPassword = decrypt(signInItem.password, user.password)
                    if (checkPassword) {
                        let payload = {
                          id: user._id,
                          name: user.name,
                          email: user.email
                        }
                        let token = sign(payload)
                        if (payload.email === 'admin@mail.com') res.status(200).json({ access_token: token, admin: true, id: payload.id })    
                            else res.status(200).json({ access_token: token, id: payload.id })
                    } else {
                        next({ code: 400, message: "Invalid email / password" })
                    }
                }
            })
            .catch(next);
        } else if (!req.body.email) {
            next({ code: 400, message: 'Please input an email' })   
        } else if (!req.body.password) {
            next({ code: 400, message: 'Please input a password' })   
        }
    }

    static signUp(req, res, next) {        
        let newUser = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            balance: req.body.balance
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static findUser(req,res, next){
        User.findById({_id: req.decoded.id})
        .then(user => {
            if (!user) {
                next({ code: 404, resource: "User" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(next)
    }

    static editBalance(req,res, next){
        let obj = {
            balance: req.body.balance
        }
        User.findByIdAndUpdate(req.decoded.id, obj, {new: true})
        .then(user => {
            if (!user) {
                next({ code: 404, resource: "User" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(next)
    }
}

module.exports = UserController