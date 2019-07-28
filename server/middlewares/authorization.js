const Cart = require('../models/cart')

module.exports = (req, res, next) => {
    Cart.findOne({
        UserId : req.decoded.id
    })
    .then(data => {
        if(data){
            if(data.UserId = req.decoded.id){
                next()
            } else {
                throw {
                    code : 401
                }
            }
        } else {
            throw {
                code : 404
            }
        }
    })
    .catch(next)
}