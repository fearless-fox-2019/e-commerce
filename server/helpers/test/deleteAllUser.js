const User = require("../../models/user");

module.exports = function deleteAllUser(){
    User.deleteMany({})
        .then(() => {
        })
        .catch((err) => {
            next(err);
        })
}