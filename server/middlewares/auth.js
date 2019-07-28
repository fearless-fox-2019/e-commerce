const jwt = require('../helpers/jwt')
const User = require('../models/user')
const Transaction = require('../models/transaction')

module.exports = {
    Authentication(req, res, next) {
        if (req.headers.hasOwnProperty('access_token')) {
            req.decoded = jwt.decoded(req.headers.access_token)
            User.findOne({ email: req.decoded.email })
            .then(data => {
                if (!data) {
                    throw {code: 404, resource: "User"}
                } else {
                    next()
                }
            })
            .catch(next)
        } else {
            throw {code: 403, message: "Forbidden page"}
        }
    },
    Authorization(req, res, next){
        if (req.params.userId) {
            Transaction.findOne({userId : req.params.userId})    
            .then((gotData)=>{
                if(gotData){
                    if(req.decoded.id == gotData.userId || req.decoded.email === 'admin@mail.com'){
                        next()
                    } else {
                        throw {code : 401, message : "Unauthorized"}
                    }
                }
            })
            .catch(next)   
        } else if (req.params.status) {
            Transaction.findOne({status : req.params.status})    
            .then((gotData)=>{
                if(gotData){
                    if(req.decoded.id === gotData.userId || req.decoded.email === 'admin@mail.com'){
                        next()
                    } else {
                        throw {code : 401, message : "Unauthorized"}
                    }
                }
            })
            .catch(next)   
        }
    },
    AdminAuthorization(req, res, next){
        if(req.decoded.email === 'admin@mail.com'){
            next()
        } else {
            throw {code : 401, message : "Unauthorized"}
        }
    },  
    UserAuthorization(req, res, next){
        Transaction.findById(req.params.id)    
        .then((gotData)=>{
            if(gotData){
                if(req.decoded.id == gotData.userId){
                    next()
                } else {
                    throw {code : 401, message : "Unauthorized"}
                }
            }
        })
        .catch(next)
    }  
} 