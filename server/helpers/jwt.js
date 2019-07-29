require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
    signToken(payload) {
        return jwt.sign(payload, process.env.ECOMMERCE_TOKEN_SECRET)
    },
    verifyToken(token) {
        return jwt.verify(token, process.env.ECOMMERCE_TOKEN_SECRET)
    }
}