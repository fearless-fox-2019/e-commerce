const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static findAll() {
        User.findAll()
            .then((datas) => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static register (req, res, next){
        const {name,email,password} = req.body
        const input = {name, email, password}
        User.create(input)
            .then((user)=>{
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login (req, res, next){
        User.findOne({email : req.body.email})
            .then((user)=>{
                if (user){
                    if (compare(req.body.password,user.password)){
                        let payload = {
                            id : user._id,
                            name : user.name,
                            email : user.email
                        }
                        
                        let token = generateToken(payload)
                        res.status(200).json({
                            token,
                            id : user._id,
                            name : user.name,
                            email: user.email
                        })
                    }
                    else {
                        throw {code: 404, message: 'Wrong Email/Password'}
                    }
                }
                else {
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            })
            .catch(next)
    }

    static loginGoogle (req, res, next){
        console.log('masuk login google')
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then((ticket)=>{
            const {email, name} = ticket.getPayload()
            
            let password = name+'miniwordpress'
            let newUser = new User ({
                name : name,
                password : password,
                email : email
            })
            User.findOne ({email : email})
            .then((user)=>{
                if (user){
                    let payload = {
                        id : user._id,
                        name : user.name,
                        email : user.email
                    }

                    let token = generateToken(payload)

                    res.status(200).json({
                        token: token,
                        userId: user._id,
                        name: user.name,
                        email: user.email
                    })
                }
                else {
                    User.create(newUser)
                    .then((user)=>{
                        let payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }

                        let token = generateToken(payload)

                        res.status(201).json({
                            token: token,
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            userId: user._id
                        })
                    })
                    .catch(next)
                }
            })
            .catch(next)
        })
        .catch(next)
    }
}

module.exports = UserController