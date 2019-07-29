if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ||process.env.NODE_ENV === 'test'){
    require('dotenv').config()
}

const express = require('express')
const indexRoutes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.ATLAS_CONNECTION, {useNewUrlParser:true})
.then((response) =>{
    console.log('Connected to Database')
})
.catch((err)=>{
    console.log('Failed connect to Database')
})
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())
app.use('/', indexRoutes)
app.use(errorHandler)

app.listen(3000, () =>{
    console.log('Running on Port :', PORT)
})

module.exports = app