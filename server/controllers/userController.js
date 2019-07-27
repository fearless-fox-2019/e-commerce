const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {
    static login(req, res){
        if(req.body.email !== '' && req.body.password !== ''){
            // console.log(req.body)
            User.findOne({
                email : req.body.email
            })
                .then(user => {
                    if(!user){
                        res.status(404).json({ message : 'invalid email / password'})
                    }
                    else {
                        if(Helper.comparePassword(req.body.password, user.password)){
                            // console.log(user)
                            let token = Helper.generateJWT({
                                id : user._id,
                                username : user.username,
                                email : user.email
                            })
                            res.status(200).json({ 
                                access_token : token, 
                                user : {
                                    _id : user._id,
                                    username : user.username,
                                    email : user.email,
                                    role : user.role
                                }
                            })
                        } else {
                            res.status(404).json({ message : 'invalid email / password'})
                        }
                    }
                })
                .catch(err => {
                    // console.log(err)
                    res.status(500).json(err)
                })
        } else {
            if(!req.body.email){
                res.status(400).json({ message : 'email is required'})
            }
            else if(!req.body.password){
                res.status(400).json({ message : 'password is required'})
            }

        }
    }

    static register(req, res){
        if(req.body.email !== '' && req.body.password !== '' && req.body.username !== ''){
            let {username, email, password, role} = req.body
            // console.log('req.body: ', req.body);
            
            User.create({
                username,
                email,
                password,
                role
            })
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(err => {
                    if (err.errors.email) {
                        res.status(400).json({ message : err.errors.email.reason });
                    } else if(err.errors.password) {
                        res.status(400).json({ message : err.errors.password.message });
                    } else if(err.errors.username) {
                        res.status(400).json({ message : err.errors.username.reason });
                    }
                    else {
                        res.status(500).json(err);
                    }
                })
        } else{
            if(!req.body.email){
                res.status(400).json({ message : 'email is required'})
            }
            else if(!req.body.password){
                res.status(400).json({ message : 'password is required'})
            }
            else if(!req.body.username){
                res.status(400).json({ message : 'username is required'})
            }
        }
    }

    static delete(req, res){
        User.findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
            
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

                res.status(200).json({access_token, userId : newUser._id, email: newUser.email, username: newUser.username})
            })
            .catch(next)
    }
}

module.exports = UserController