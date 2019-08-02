const User = require('../models/user')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static register(req, res, next) {
        User
            .create(req.body)
            .then(newUser => {
                res
                    .status(201)
                    .json(newUser);
            })
            .catch(err => {
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
                    if (err.errors.email) {
                        res
                            .status(400)
                            .json({
                                message: err.errors.email.message
                            })
                    } else {
                        res
                            .status(403)
                            .json({
                                message: err.message
                            })
                    }
                } else {
                    next()
                }
            });
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        });
                } else {
                    if (Helper.comparePassword(req.body.password, foundUser.password)) {
                        const token = Helper.generateJWT(foundUser._id, foundUser.name, foundUser.role);

                        res
                            .status(200)
                            .json({
                                accesstoken: token
                            });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(next);
    }

    static loginGoogle(req, res, next) {
        let newEmail = ''
        let newName = ''

        client.verifyIdToken({
                idToken: req.headers.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(function(ticket) {
                newEmail = ticket.getPayload().email
                newName = ticket.getPayload().name
                return User.findOne({
                    email: newEmail
                })
            })
            .then(function(userLogin) {
                if (!userLogin) {
                    return User.create({
                        username: newName,
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    return userLogin
                }
            })
            .then(function(newUser) {
                let access_token = Helper.generateJWT({
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    id: newUser._id
                });

                res.status(200).json(access_token)
            })
            .catch(next)
    }
}

module.exports = UserController
