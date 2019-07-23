const Item = require("../../models/item");

module.exports = function deleteAllItem(){
    Item.deleteMany({})
        .then(() => {
            // console.log("All Item Cleared");
        })
        .catch((err) => {
            // console.log("Error While Delete All User");
            next(err);
        });
}