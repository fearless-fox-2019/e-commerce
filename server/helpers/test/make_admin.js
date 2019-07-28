const User = require("../../models/user");

module.exports = function(email){
    User.findOneAndUpdate({email: email}, {role: "admin"}, {runValidators: true, new: true})
        .then((data) => {
            console.log(`User ${email} has been changed to admin`);
        })
        .catch((err) => {
            console.log(err);
        })
}