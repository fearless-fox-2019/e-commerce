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
                            res.status(200).json({ access_token : token, user : {
                                _id : user._id,
                                username : user.username,
                                email : user.email
                            }})
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
}

module.exports = UserController