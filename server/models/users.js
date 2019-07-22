const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required !'],
    validate: [{
      validator: function(value) {
        return new Promise ((resolve, reject) => {
          if(this.isNew) {
            User.findOne({email: value})
            .then (member => {
              if (member){
                resolve (false)
              } else {
                resolve (true)
              }
            })
            .catch(err => {
              reject (err)
            })
          } else {
            resolve(true)
          }
        })
      },
      message: props => `email already used!`
    },
    {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `invalid email !`
    }]
  },
  password: {
    type: String,
    required: [true, 'password is required !'],
    minlength: [8, 'password too short !']
  },
  username: {
    type: String,
    required: [true, 'username is required !'],
    validate: [{
      validator: function(value) {
        return new Promise ((resolve, reject) => {
          if(this.isNew) {
            User.findOne({username: value})
            .then (member => {
              if (member){
                resolve (false)
              } else {
                resolve (true)
              }
            })
            .catch(err => {
              reject (err)
            })
          } else {
            resolve(true)
          }
        })
      },
      message: props => `username already used!`
    }]
  },
  role: {
    type: String,
    default: 'user'
  }
});

usersSchema.pre('save', function(next) {
  if(!this.isModified('password')) {
    return next();
  }
  this.password = hashPassword(this.password)
  next();
})





const User = mongoose.model('User', usersSchema)
module.exports = User