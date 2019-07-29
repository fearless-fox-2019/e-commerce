const {
    sign,
    verify
} = require('../helpers/jwtoken')
const userModel = require('../models/userModel')
const transactionModel = require('../models/transactionModel')

module.exports = {
    authentication: function (req, res, next) {
        let token = req.headers.token
        if (!token) {
            throw ({
                code: 400,
                message: `Unauthenticated`
            })
        } else {
            let decode = verify(token)
            userModel
                .findOne({
                    email: decode.email
                })
                .then((found) => {

                    let decode = verify(token)
                    req.decode = decode
                    req.logedUser = found
                    next()
                })
                .catch((err) => {
                    throw ({
                        code: 404,
                        message: `User not found`
                    })
                })
        }
    },
    sent_authorization: function (req, res, next) {
        let userId = req.logedUser._id

        userModel
            .findById(userId)
            .then(foundUser => {
                console.log(foundUser)
                return transactionModel
                    .findById(req.params.transactionId)
            })
            .then(foundTransaction => {
                console.log(foundTransaction)
                if(userId === foundTransaction.userId){
                    throw({
                        code: 401,
                        message: `Ooops, youre not user who order this item`
                    })
                }
                next()
            })
            .catch(next)
    },
    admin_authorization: function(req,res,next){
        let userId = req.logedUser._id

        userModel
            .findById(userId)
            .then(foundUser => {
                if (foundUser.role !== 'admin') {
                    throw ({
                        code: 401,
                        message: 'Unauthorized user, must be an Admin'
                    })
                }
                next()
            }).catch(next)
    }
}