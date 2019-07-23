if(!process.env.NODE_ENV || process.env.NODE_ENV === "development"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@hendrixsilaen-pkgui.mongodb.net/e-commerce?retryWrites=true&w=majority`, {useNewUrlParser: true, useFindAndModify: false}, (err) => {
    if(err) throw err;
    else ;
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use("/", routes);

app.use(function(err, req, res, next){
    console.log("\n\n==========================================");
    console.log("ERROR HANDLER");
    console.log(err);
    console.log("==========================================\n\n");
    res.status(500).json({message: "Internal server error"})
})

module.exports = app;