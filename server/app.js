if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000
const errHandler = require('./middlewares/error-handlers')
const routes = require('./routes/index')

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser:true})
.then(response => {
    console.log('Connected to e-commerce 😘 🌎' )
})
.catch(err => {
    console.log(err.message)
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/', routes)

app.use(errHandler)

app.listen(port, () => console.log( `port ${port} is running!`))

module.exports = app