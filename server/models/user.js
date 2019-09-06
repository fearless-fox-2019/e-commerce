const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hashPassword} = require('../helpers/bcrypt')

const userSchema = new Schema({
  firstname : {
    type : String,
    required : [true, "Firstname can't be empty"]
  },
  lastname : {
    type : String,
    required : [true, "Lastname can't be empty"]
  },
  email : {
    type : String,
    required : true,
    validate : [{
      validator : function(email){
        return User.findOne({email : email})
        .then(data => {
          if(data) return false
          else return true
        })
        .catch(err => {
          throw err
        })
      }
    },
    {
      validator : function(email){
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      },
      message: props => `Email is invalid`
    }]
  },
  password : {
    type : String,
    min : 8
  }
}, {timestamps:true});

userSchema.pre('save', function(next){
  this.password = hashPassword(this.password)
  console.log(this.password, "udah dihashhhhhhhh");
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User