const {verify} = require('../helpers/jwt')

module.exports = (req, res, next) => {
    if(req.headers.hasOwnProperty('token')){
        try {
            console.log("masuk authen");
            console.log(req.headers.token, "hummmmmmmmmmmmmmmmmmmmmmmmm!!!");
            
            const decoded = verify(req.headers.token)
            req.decoded = decoded
            console.log(req.decoded, "ini decodenya");
            
            next()
        } 
        catch (err) {
            res.status(400).json({
                message : `Bad Request`
            })
        }
    } else {
        res.status(403).json({
            message : `Forbidden Page`
        })
    }
}