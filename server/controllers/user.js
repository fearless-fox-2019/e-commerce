const User = require("../models/user");
const {compare} = require("../helpers/bcrypt");
const {sign, verify} = require("../helpers/jwt");

class UserController{
    static register(req, res, next){
        User.create(req.body)
            .then((newUser) => {
                res.status(201).json(newUser);
            })
            .catch((err) => {
                next(err);
            })
    }

    static login(req, res, next){
        let user;
        User.findOne({email: req.body.email})
            .then((data) => {
                user = data;
                if(user){
                    return compare(req.body.password, user.password) 
                }else{
                    next({code: 401, message: "Email and/or Password is wrong"})
                }
            })
            .then(() => {
                const payload = {
                    id: user._id,
                    email: user.email,
                }
                const token = sign(payload);

                res.status(200).json({message: "Successfuly Regiestered"});
            })
            .catch((err) => {
                next(err);
            });
    }
}


module.exports = UserController;