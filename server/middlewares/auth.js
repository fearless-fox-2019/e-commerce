const jwtoken = require('../helpers/jwt')

module.exports = {
    authentication(req, res, next) {
        // console.log(req.headers.token, 'AUTHENTICATION <<<<<<<<<<<<<')
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            // console.log(decoded)
            req.headers.decode = decoded
            next()
        } catch (err) {
            throw new Error(`Invalid token.`)
        }
    }
}