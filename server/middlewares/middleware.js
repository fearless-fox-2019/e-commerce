const Helper = require('../helpers/helper')
const Cart = require('../models/cart')
const User = require('../models/user')

module.exports = {
    authentication : (req, res, next) => {
        try {
            // console.log(req.headers.access_token, 'ini token di middleware')
            const decoded = Helper.verifyJWT(req.headers.access_token);
            // console.log('decoded: ', decoded);

            User.findById(decoded.id)
                .then(user => {
                    if(user){
                        // console.log(user, 'userrrrrrrrrrrrrrr')
                        req.loggedUser = decoded
                        next()
                    } else {
                        res.status(401).json({message : 'not authorized'})
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                    // throw new Error(err)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    authorization : {
        cart(req, res, next){
            Cart.findById(req.params.id)
                .then(( data ) => {
                    if(req.loggedUser.id == data.userId){

                        next()
                    } else {
                        res.status(401).json({message : 'not authorized'})
                    }
                })
                .catch(err => {
                    res.status(401).json({message : 'not authorized'})
                })
        },
        customer(req, res, next){
            
            User.findById(req.loggedUser.id)
                .then(( data ) => {
            
                    if(data.role === 'customer'){
            
                        next()
                    } else {
            
                        res.status(401).json({message : 'not authorized'})
                    }
                })
                .catch(err => {
            
                    res.status(401).json({message : 'not authorized'})
                })
        },
        user(req, res, next){
            User.findOne({
                _id : req.loggedUser.id
            })
                .then(( data ) => {
                    if(data.role === 'admin'){
                        next()
                    } else {
                        res.status(401).json({message : 'not authorized'})
                    }
                })
                .catch(err => {
                    res.status(401).json({message : 'not authorized'})
                })
        },
        userDelete(req, res, next){
            if(req.loggedUser.id == req.params.id){
                next()
            } else {
                res.status(401).json({message : 'not authorized'})
            }
        }

    }
}