if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV=== 'test'){
    require('dotenv').config()
}


const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const route = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, function(err){
    if(err) throw err
    else console.log('success connect to database')
});

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/',route)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})

module.exports= app