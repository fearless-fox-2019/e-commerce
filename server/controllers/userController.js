const userModel = require('../models/userModel')
const {
    hash,
    compare
} = require('../helpers/bcryptjs')
const {
    sign,
    verify
} = require('../helpers/jwtoken')

class UserController {
    static signup(req, res, next) {
        // console.log('masuk sign up===-')
        let {
            username,
            email,
            password
        } = req.body
        let newUser = {
            username,
            email,
            password
        }

        userModel
            .create(newUser)
            .then(created => {
                // console.log(created, 'created user')
                res.status(201).json(created)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static signin(req, res, next) {
        let searched = {}
        let password = req.body.password

        if (req.body.email) {
            searched.email = req.body.email
        } else if (req.body.username) {
            searched.username = req.body.username
        } else {
            searched.username = undefined
        }
        
        userModel
            .findOne(searched)
            .then(found => {
                if (found) {
                    if (compare(password, found.password)) {
                        let payload = {
                            username: found.username,
                            email: found.email,
                            role: found.role,
                            whistlist: found.siwhlist,
                            cart: found.cart
                        }
                        let token = sign(payload)
                        res.status(200).json({
                            token
                        })
                    } else {
                        throw ({
                            code: 404,
                            message: `invalid username / email / password`
                        })
                    }
                } else {
                    throw ({
                        code: 404,
                        message: `invalid username / email / password`
                    })
                }
            })
            .catch(next)
    }

    static googleSignin(req,res,next){

    }

    static whoami(req,res,next){}
    static addWishlist(req,res,next){}
}

module.exports = UserController