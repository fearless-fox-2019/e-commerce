if(!process.env.NODE_ENV || process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/error_handler");

let mongoDatabase;
if(process.env.NODE_ENV == "test"){
    mongoDatabase = "e-commerce-tokumu_test";
}else{
    mongoDatabase = "e-commerce-tokumu";
}

mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@hendrixsilaen-pkgui.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex : true, useFindAndModify: false}, (err) => {
    if(err){
        throw err;
    }else{
        console.log("database OK");
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/", routes);
app.use(errorHandler);

module.exports = app;


