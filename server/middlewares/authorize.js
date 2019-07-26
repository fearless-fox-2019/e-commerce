const Cart= require('../models/cart')
const User= require('../models/user')


module.exports={
    authorizeAdmin(req, res, next){
        User.findById(req.decode.id)
        .then(user =>{
            if(!user){
                res.status(404).json({message: 'User Not Found'})
            }else{
                if(user.role == 'admin'){
                    next()
                }else{
                    res.status(403).json('Not Authorized')
                }
            }
        })
    },

    authorizeCust(req, res, next){
        Cart.findById(req.params.id)
        .then(cart =>{
            if(!cart){
                res.status(404).json({message: 'Cart Not Found'})
            }else{
                if(cart.customerId == req.decode.id){
                    next()
                }else{
                    res.status(403).json('Not Authorized.')
                }
            }
        })
    }
}
