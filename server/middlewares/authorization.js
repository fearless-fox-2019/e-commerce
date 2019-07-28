const User = require('../models/user')
module.exports = function authorization(req, res, next) {
    console.log(req.decoded, "==============")
    // console.log('ashiap masuk authorization')
    // console.log(req.decoded.id)
    User.findOne({ _id : req.decoded.id })
    .then(data => {
        console.log(data)
        if(data.isAdmin){
            next()
        } else {
            next({status : 403, message : 'Unauthorized'})
        }
    })
    .catch(next)
}