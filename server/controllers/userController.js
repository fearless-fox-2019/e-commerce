const User = require('../models/user')
const {sign} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class UserController{
    static register(req, res, next){
        let {firstname, lastname, email, password} = req.body
        console.log(req.body, "ini req body dari register");
        let newUser = {firstname, lastname, email, password}
        console.log(newUser, "new user");

        User.create(newUser)
        .then(data => {
            let user = {
                id : data._id,
                email : data.email 
            }

            let token = sign(user)
            res.status(201).json({
                data, token
            })
        })
        .catch(next)
        
    }

    static login(req, res, next){
        let {email, password} = req.body
        console.log(req.body, "ini req body login");
        
        User.findOne({email : email})
        .then((found) => {
            console.log(found, "founfrfff");
            
            if(found){
                if(comparePassword(password, found.password)){
                    console.log("masuk siniiii");
                    
                    let userLogin = {
                        id : found._id,
                        email : found.email
                    }

                    console.log(userLogin);
                    
                    let token = sign(userLogin)
                    console.log(token, "token dr controller");
                    
                    
                    res.status(200).json({
                        data : found,
                        token
                    })
                } else {
                    throw {
                        code : 404,
                        message : `Invalid username / password`
                    }
                }
            } else {
                throw {
                    code : 404,
                    message : `Invalid username / password`
                }
            }
        })
        .catch(next)
    }

    static delete(req, res, next){
        User.findByIdAndDelete(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        User.findById(req.params.id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(next)
    }
}

module.exports = UserController