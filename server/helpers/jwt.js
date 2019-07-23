const jwt = require("jsonwebtoken");

exports.sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

exports.verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}