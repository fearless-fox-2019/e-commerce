const { OAuth2Client } = require('google-auth-library'),
    { compare } = require('../helpers/encrypt'),
    client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID),
    User = require('../models/user'),
    jwt = require('jsonwebtoken')

module.exports = class userController {
    static signUp (req, res, next) {
        User.create(req.body)
            .then( data => res.status(201).json(data))
            .catch( err => next(err))
    }

    static signIn (req, res, next) {
        let payload
        User.findOne({ email: req.body.email })
            .then( data => {
                if(data){
                    if(compare(req.body.password, data.password)){
                        payload = {
                            id: data._id,
                            email: data.email,
                            name: data.first_name
                        }
                        
                        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                        res.status(200).json({ access_token: token, name: payload.name })
                    } else { throw { code: 400, message: 'Wrong email/password'} }


                } else { throw { code: 400, message: 'Wrong email/password'} }
            })
            .catch( err => next(err) )
    }

    static googleSignIn (req, res, next) {
        let payload
        client.verifyIdToken({ 
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload()
            return User.findOne({ email: payload.email })
        })
        .then( user => {
            if(user) {
                return user
            } else {
                let newUser = new User({
                    name: payload.name,
                    email: payload.email,
                    password: payload.jti 
                })
                return newUser.save()
            }
        })
        .then( loggedIn => {
            if( loggedIn ){
                let token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                res.status(200).json({ access_token: token, username: payload.name })
            } else {
                throw new Error('Invalid username or password')
            }
        })
        .catch( err => next(err) )
    }
}