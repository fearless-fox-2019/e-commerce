const User = require('./models/user')

module.exports = {
    loginUser : function(email, password){
        User.findOne({email : email})
        .then(found => {
            if(found){
                if(found.password == password){
                    return found
                } else {
                    return `Username / password invalid`
                }
            } else {
                return `Username / password invalid`
            }
        })
        .catch(err => {
            return err
        })
    }
}