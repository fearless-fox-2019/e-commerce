const User = require('../models/user');
const Product = require('../models/product');
const { verify } = require('../helpers/token');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token
    if (!token) {
      throw {
        Status: 404,
        message: `Token Not Provided`
      }
    } else {
      const decoded = verify(token)
      User.findOne({
          _id: decoded.id
        })
        .then((found) => {
          req.decoded = decoded;
          req.loggedUser = found
          next()
        })
        .catch((err) => {
          throw {
            Status: 404,
            message: 'User Not Found || Auth Failed'
          }
        })
    }
  },
  authorization: (req, res, next) => {
    User.findById(req.decoded.id)
    .then((found) => {
      if(found.email == 'admin@admin.com' && found.fullname === 'admin') {
        next()
      } else {
        throw {
          status : 401,
          message : `Unauthorized Access || Authorization Failed`
        }
      }
    })
    .catch(next);
  }
}