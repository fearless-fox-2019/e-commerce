const bcrypt = require("bcryptjs");


function hash(input){
    return bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(input, salt);
        })
        .catch((err) => {
            throw err;
        });
}

function compare(input, hashed){
    return bcrypt.compare(input, hashed);
}


module.exports = {
    hash,
    compare
}