const mongoose = require('mongoose');
const { Schema } = mongoose;
const Helper = require('../helpers/helper');

const userSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'Name can not be blank' ]
  },
  email: {
    type: String,
    required: [ true, 'Email can not be blank' ],
    unique: true,
    validate: [
      {
        validator: function (email) {
          return new Promise(function (resolve, reject) {
            User.findOne({ email })
              .then(data => !data ? resolve(true) : resolve(false))
              .catch(err => reject(err))
          });
        },
        message: props => `${props.value} already registered`
      }
    ]
  },
  password: {
      type: String,
      required: true,
      minlength: [4, 'Password min length is 4'],
  },
  address: {
    type: String,
    default: ''
  },
  phone : {
    type: String,
    default: '',
    min: [10, 'Phone length 10-13'],
    max: [13, 'Phone length 10-13']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.pre('save', function(next, done) {
    this.password = Helper.hashPassword(this.password)
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User;