const encrypt = require('../helpers/encrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name field can\'t be blank!']
    },
    email : {
        type : String,
        validate : {
            validator : function(value){
                let regexEmail = /\S+@\S+\.\S+/;
                if(!regexEmail.test(value)){
                    return false
                }
            }, message : 'email format wrong!'
        },
        required : [true , 'email required!'],
        unique: true
    },
    password : {
        type : String,
        minlength : [6, 'password length must be more than 6 characters!'],
        required : [true, 'password required!']
    },
    role : {
        type : String,        
    }, 
    GameId : [{type : Schema.Types.ObjectId, ref : 'Game'}]
});

UserSchema.plugin(uniqueValidator, { message: 'Error, {PATH} has already taken by another user!' });

UserSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User