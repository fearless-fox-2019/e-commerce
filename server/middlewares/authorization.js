const {verifyToken} = require('../helpers/jwt')
const Shoes = require('../models/shoes')

function authorization(req,res,next) {
    Shoes.findById(req.params.id)
        .then((Shoes => {
            if(Shoes) {
                if(req.decoded.role == 'admin') {
                    next()
                } else {
                    throw {status:403, message:'Unauthorized'}
                }
            } else {
                throw {status:404, message: 'Shoes not found'}
            }
        }))
        .catch(next)
}

module.exports = authorization