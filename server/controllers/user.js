const User = require("../models/user");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

class UserController{
    static register(req, res, next){
        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(userData)
            .then((newUser) => {
                console.log(`>>> USER REGISTERED [${newUser.email} on ${new Date()}]`);

                res.status(201).json({message: "User has been registered"});
            })
            .catch((err) => {
                console.log("masuk");
                next(err);
            });
    }

    static login(req, res, next){
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        
        let user;
        User.findOne({email: userData.email})
            .then((data) => {
                user = data;

                if(user){
                    return bcrypt.compare(userData.password, user.password);
                }else{
                    throw new Error();
                }
            })
            .then((isValid) => {
                if(isValid){
                    console.log(`>>> USER LOGGED IN [${user.email} on ${new Date()}]`);

                    const payload = {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        balance: user.balance,
                        role: user.role
                    }

                    const token = jwt.sign(payload);

                    res.status(200).json({
                        message: "Successfully Logged In",
                        token: token,
                        data: {
                            email: user.email,
                            balance: user.balance,
                            role: user.role
                        }
                    });

                }else{
                    throw new Error();
                }
            })
            .catch((err) => {
                next({code: 401, message: "Email or password is wrong"});
            })
    }

}


module.exports = UserController;