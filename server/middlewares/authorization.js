const user= require('../models/user')

function authorizationAdmin(req, res, next){
    user.findById(req.decode.id)
    .then(user =>{
        if(!user){
            res.status(404).json({message: 'User Not Found'})
        }else{
            if(user.admin == true){
                next()
            }else{
                res.status(403).json('You are not admin, Not Authorized')
            }
        }
    })
}

module.exports = authorizationAdmin