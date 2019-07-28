const jwt = require("jsonwebtoken");

function sign(input){
    return jwt.sign(input, process.env.JWT_SECRET);
}

function verify(input){
    return jwt.verify(input, process.env.JWT_SECRET);
}


module.exports = {
    sign,
    verify
}