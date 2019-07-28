const User = require('../models/user')

async function deleteUser () {
    await User.deleteMany({
        email: {
            $ne: 'admin@mail.com'
        }
    })
}

module.exports = deleteUser