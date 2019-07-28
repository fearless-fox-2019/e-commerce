const User = require('../models/users')
const {comparePassword} = require('../helpers/bcryptPassword')
const {createToken} = require('../helpers/jwt')
const {verifyToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
// const transporter = require('../helpers/nodeMailer')
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')

let payload

class UserController {
    static findAll(req,res,next) {
        User.findAll()
            .then((datas) => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static findUser(req,res,next) {
        User.findOne({_id:req.params.id})
            .then(dataFound => {
                res.status(200).json(dataFound)
            })
            .catch(next)
    }

    static create(req,res,next) {
        const {username,password,email,role}=req.body
        const input = {username,password,email,role}
        // console.log('halo')
        // console.log(input);
        User.create(input)
            .then((dataCreated) => {
                // console.log(dataCreated)
                res.status(201).json(dataCreated)
            })
            .catch(next)
    }

    static confirmEmail(req,res,next) {
        try {
            const user = verifyToken(req.params.token)
            // const user = jwt.verify(req.params.token, process.env.EMAILSECRET); //decoded.foo == bar // user.data
            // User.updateOne({ confirmed: true }, { where: { id: user.data } });
            User.findById(user.data)
                .then((dataFound) => {
                    if(dataFound) {
                        dataFound.confirmed = true
                        dataFound.save()
                    } else {
                        throw {status: 404, message: 'token is wrong/user not found'}
                    }
                })
        //   console.log('asd');
        } catch (e) {
            next()
        }
    }

    static login(req,res,next) {
        const {email,password} = req.body
        // console.log({username,password})
        User.findOne({email: email})
            .then((userFound) => {
                if(userFound) {
                    if(comparePassword(password,userFound.password)) {
                        // console.log(userFound)
                        let tokenJWT = createToken({username: userFound.username, email: userFound.email,_id: userFound._id,role: userFound.role}, process.env.JWT_SECRET)
                        res.status(200).json({token: tokenJWT, username: userFound.username, email: userFound.email,role:userFound.role,id: userFound._id})
                    } else {
                        throw {status:404, message: 'username/password salah'}
                    }
                } else {
                    throw {status: 404, message: 'username/password salah'}
                }
            })
            .catch(next)
    }

    static googleSignIn(req,res,next) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then((datas) => {
            payload = datas.getPayload();
            return User.findOne({email:payload.email})
        })
        .then((userFound) => {
            if(userFound) {
                // console.log(userFound)
                // let tokenJWT = createToken({username: userFound.username, email: userFound.email,_id: userFound._id}, process.env.JWT_SECRET)
                // res.status(200).json(tokenJWT)
                // next()

                return  userFound
            } else {
                return User.create({
                    email: payload.email,
                    username: payload.given_name+payload.family_name,
                    password: 12345
                })
            }
        })
        .then((dataCreated) => {
            // console.log(dataCreated)
            if(dataCreated) {
                // console.log(dataCreated)
                let tokenJWT = createToken({username: dataCreated.username, email: dataCreated.email,_id: userFound._id}, process.env.JWT_SECRET)
                res.status(201).json(tokenJWT)
            } else {
                next()
            }
        })
        .catch(next)
        // console.log(ticket)

    }


}

module.exports = UserController