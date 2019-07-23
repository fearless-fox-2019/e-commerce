const mongoose = require("mongoose");
const {Schema} = mongoose;
const {hash} = require("../helpers/bcrypt");


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [{
            validator: function isValid(value){
                const reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return reg.test(value)
            }, message: "Invalid email format"
        },
        {
            validator: function isUnique(value){
                return new Promise(function(resolve, reject){
                    User.findOne({email: value})
                        .then((user) => {
                            if(user){
                                resolve(false);
                            }else{
                                resolve(true);
                            }
                        })
                        .catch((err) => {
                            resolve(false);
                        });
                });
            }, message: "Email is already used"
            
        }]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        validate: [{
            validator: function isValid(value){
                if(value.length < 6){
                    return false;
                }else{
                    return true
                };
            }, message: "Username must be more than 6 characters"
        },
        {
            validator: function isUnique(value){
                return new Promise(function(resolve, reject){
                    User.findOne({username: value})
                        .then((user) => {
                            if(user){
                                resolve(false);
                            }else{
                                resolve(true);
                            }
                        })
                        .catch(() => {
                            resolve(false);
                        })
                })
            }, message: "Username already exist"
        }]
    },
    role: String,
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [{
            validator: function isValid(value){
                if(value.length < 6){
                    return false;
                }else{
                    return true
                };
            }, message: "Password must be more than 6 characters"
        }]
    }

});


userSchema.pre("save", function(next){
    hash(this.password)
        .then((hashed) => {
            this.password = hashed;
            next();
        })
        .catch((err) => {
            next(err);
        })
})

const User = mongoose.model("user", userSchema);

module.exports = User;