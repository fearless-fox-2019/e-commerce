const {verify} = require('../helpers/jwt')

module.exports = {
    authentication : function (req,res,next){
        console.log('masuk authentication')
        if(req.headers.token) {
            try {
                let decode = verify(req.headers.token)
                req.user = decode
                next()
            } catch(err) {
                next(err)
              }

        }else {
            next({code: 401, message: "Login First"})
        }
    }
}