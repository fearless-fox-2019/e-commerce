const User= require('../models/user')
const {compare}= require('../helpers/bcrypt')
const {generateToken}= require('../helpers/jwt')

class userController{

    static register(req, res, next){
        let newUser= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            products:[]
        })
        
        newUser.save()
        .then(user =>{
            let payload= {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }

            let token= generateToken(payload)

            res.status(201).json({
                        token,
                        userId: user._id,
                        name: user.name,
                        role: user.role
                    })
        })
        .catch(next)
    }
    
    static login(req, res, next){
        User.findOne({email: req.body.email})
        .then(user=>{
            if(user){
                if(compare(req.body.password, user.password)){
                    let payload= {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }

                    let token= generateToken(payload)

                    res.status(200).json({
                        token,
                        userId: user._id,
                        name: user.name,
                        role: user.role
                    })
                }else{
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            }else{
                throw {code: 404, message: 'Wrong Email/Password'}
            }
        })
        .catch(next)
    }

    static getAllUser(req, res, next){
        User.find({})
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(next)
    }
    
    static changeRole(req, res, next){
        User.findByIdAndUpdate(req.params.id, {role: req.body.role}, {new: true})
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(next)
    }
}

module.exports= userController