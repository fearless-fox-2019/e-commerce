const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {
  hashSync
} = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [{
        validator: function (value) {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            throw 'Invalid email format'
          }
        },
      },
      {
        validator: function (value) {
          return User.find({
              _id: {
                $ne: this._id
              },
              email: value
            })
            .then(data => {
              if (data.length !== 0) {
                throw 'Email has been registered';
              }
            })
            .catch(err => {
              throw err;
            });
        }
      }
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password min length is 8'],
  }
});

userSchema.pre('save', function (next) {
  this.password = hashSync(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User