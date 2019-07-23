const bcrypt = require("bcryptjs");

exports.hash = (input) => {
    return bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(input, salt);
        })
        .catch((err) => {
            next({code: 500, message: "Error when hashing the data with bcrypt", details: err.message});
        })
}

exports.compare = (input, encrypted) => {
    return bcrypt.compare(input, encrypted);
}