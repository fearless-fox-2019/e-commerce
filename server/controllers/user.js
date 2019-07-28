const User = require('../models/user')
const {getToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class UserController{
    static resgister(req, res){
        User.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }
    static getAll(req, res){
        User.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
    static login(req, res, next){
        // email & password => jwt
        const {email, password} = req.body
        User.findOne({email: email})
        .then(data => {
            // console.log(data)
            if(data){
                // console.log(data.password)
                if(comparePassword(data.password, password)){
                    const forJwt = {
                        id: data._id,
                        email: data.email,
                        username: data.username
                    }
                    const token = getToken(forJwt)
                    res.status(200).json({
                        message: 'Valid',
                        data: {
                            id: data._id,
                            name: data.username,
                            email: data.email
                        },
                        jwt: token
                    })
                }else{
                    res.status(400).json({
                        message: 'Username/Password Invalid'
                    })
                }
            }else{
                res.status(400).json({
                    message: 'Username/Password Invalid'
                })
            }
            // console.log(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
    }
}

module.exports = UserController