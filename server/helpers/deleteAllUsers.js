const User = require('../models/user')

module.exports = function () {
    // if (process.env.NODE_ENV == 'test') {
    User.deleteMany({})
        .then(() => {
            console.log('All users cleared!')
        })
        .catch(err => {
            console.log(err)
        })
    // }
}