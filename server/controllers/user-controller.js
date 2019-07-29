const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {

    static signup(req, res, next) {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        // console.log(req.body, 'body di login <<<<<<<<<<<<<<<<<')
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = jwt.signToken(payload)
                        res.status(200).json([token, payload.username])
                    } else {
                        throw new Error('Invalid username / password.')
                    }
                } else {
                    throw new Error('Invalid username / password.')
                }
            })
            .catch(next)
    }

}

module.exports = UserController