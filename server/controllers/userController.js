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
        console.log('masuk sign up===-')
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
        console.log(newUser)
        userModel
            .create(newUser)
            .then(created => {
                console.log(created, 'created user')
                res.status(201).json(created)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        console.log('masuk signinmya servermloh')
        let searched = {}
        let {
            ue,
            password
        } = req.body

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ue)) {
            searched.email = ue
        } else {
            searched.username = ue
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

    static googleSignin(req, res, next) {

    }

    static whoami(req, res, next) {
        let logedUser = req.logedUser._id

        userModel
            .findById(logedUser)
            .then(foundLoged => {
                res.status(200).json({
                    cart: foundLoged.cart ,
                    createdAt: foundLoged.createdAt ,
                    email: foundLoged.email ,
                    role: foundLoged.role ,
                    updatedAt: foundLoged.updatedAt ,
                    username: foundLoged.username ,
                    wishlist: foundLoged.wishlist ,
                    _id: foundLoged._id
                })
            })
            .catch(next)
    }
    static addWishlist(req, res, next) {}
}

module.exports = UserController