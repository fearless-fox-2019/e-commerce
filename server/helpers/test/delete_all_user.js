const User = require("../../models/user");

module.exports = function(){
    User.deleteMany({})
        .then(() => {
            console.log("All user data has been cleared up");
        })
        .catch((err) => {
            console.log("Error while clearing up the user data");
        })
}