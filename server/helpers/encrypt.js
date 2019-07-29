const bcryptjs = require('bcryptjs');
let salt = bcryptjs.genSaltSync(8);

function encrypt(password){
    return hash = bcryptjs.hashSync(password, salt)
}

function compare(password, hash){
    return bcryptjs.compareSync(password, hash)
}

module.exports = { 
    encrypt, 
    compare
}