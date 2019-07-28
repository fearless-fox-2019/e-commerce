const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("../helpers/bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already used"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already user"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    balance: {
        type: Number
    },
    role: {
        type: String
    }
});


userSchema.pre("save", function isEmailValid(next){
    const reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const isValid = reg.test(this.email);

    if(isValid){
        next()
    }else{
        throw ({code: 400, message: "Email format is invalid"});
    }

});

userSchema.pre("save", function isUsernameValid(next){

    const isValid = (this.username.length > 6);

    if(isValid){
        next();
    }else{
        throw ({code: 400, message: "Username must be longer than 6 characters"});
    }

});

userSchema.pre("save", function isPasswordValid(next){
    
    const isValid = (this.password.length > 6);

    if(isValid){
        bcrypt.hash(this.password)
            .then((hashed) => {
                this.password = hashed;
                next();
            })
            .catch((err) => {
                throw ({code: 500});
            })
    }else{
        throw ({code: 400, message: "Password must be longer than 6 characters"});
    }

});

userSchema.pre("save", function setFirstBalance(next){

    if(this.isNew){
        this.balance = 0
        next();
    }else{
        next();
    }

});

userSchema.pre("save", function setCustomerRole(next){

    if(this.isNew){
        this.role = "customer";
        next();
    }else{
        next();
    }

});

const User = mongoose.model("user", userSchema);

module.exports = User;