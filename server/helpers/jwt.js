const jwt = require("jsonwebtoken")

module.exports = {
    sign(data) {
        return jwt.sign(data, process.env.SECRET_JWT)
    },
    decoded(token) {
        return jwt.verify(token, process.env.SECRET_JWT)
    }
}