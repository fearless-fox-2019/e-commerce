const mongoose = require("mongoose")
const encrypt = require("../helpers/encrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is empty"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is empty"],
        unique: [true, "email is already taken"],
        validate: {
            validator: function(value) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(value)
            }
        }
    },
    role : {
        type : String,        
    },
    password: {
        type: String,
        required: [true, "password is empty"],
        minlength : [6, 'password length must be more than 6 characters!'],
    },
    verify:{
        type:Boolean
    },
}, {timestamps: true})

userSchema.pre("save", function(next){
    this.password = encrypt(this.password)
    next()
})

module.exports = mongoose.model("User", userSchema)