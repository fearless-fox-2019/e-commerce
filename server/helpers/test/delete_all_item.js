const Item = require("../../models/item");

module.exports = function(){
    Item.deleteMany({})
        .then(() => {
            console.log("All item data has been cleared up");
        })
        .catch((err) => {
            console.log("Error while clearing up the item data");
        })
}