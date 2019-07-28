const jwt = require('../helpers/jwt')
const Model = require('../models/index')

function authentication(req, res, next) {
    const token = req.headers.token
    try {
        const decoded = jwt.checkToken(token)
        req.decoded = decoded
        next()
      } catch(err) {
        res.status(403).json({
            message: 'Forbidden - gabisa',
            data: err
        })
      }
}


module.exports = {authentication}