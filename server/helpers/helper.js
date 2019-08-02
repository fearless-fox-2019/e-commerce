const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword(password){
        return bcrypt.hashSync(password, 10)
    },
    comparePassword(password, passwordDB){
        return bcrypt.compareSync(password, passwordDB)
    },
    generateJWT(_id, name, role){
        return jwt.sign({_id, name, role}, process.env.JWT_SECRET)
    },
    verifyJWT(userPayload){
        return jwt.verify(userPayload, process.env.JWT_SECRET)
    }
}