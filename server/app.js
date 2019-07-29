require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const errorHandler = require('./middleware/errorHandler')
const NODE_ENV = process.env.NODE_ENV 
const index=require('./routers/index.js')
const cors= require('cors')
const mongoose = require('mongoose')
const connection = ''

if (NODE_ENV) {
    connection =  'mongodb://localhost:27017/e-commerce-'+NODE_ENV
} else {
    connection = process.env.CONNECTION
}

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', index)
app.use(errorHandler)

app.listen(port, () => {
    console.log('Running on port : ', port)
    mongoose.connect(`${connection}`, {useNewUrlParser: true})
    .then( () => {
        console.log('Connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = app