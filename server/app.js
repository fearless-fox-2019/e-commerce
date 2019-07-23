if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/indexRoutes')
const mongoose = require('mongoose')
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())
app.use(morgan())
app.use('/',routes)

let collection = 'ecommerce'
if(process.env.NODE_ENV === 'test'){
    collection = 'ecommerce-test'
}

mongoose.connect(`mongodb://localhost:27017/${collection}`, {useNewUrlParser: true})
.then(() => {
    console.log('Mongoose connected!')
})
.catch(() => {
    console.log('Failed to connect mongoose')
})



app.use(function (err, req, res, next) {
   const status = err.status || 500
   const message = err.message || 'Internal server error'
   console.log(message)
   if(err.name === 'ValidationError') {
       res.status(400).json({message})
   }
   res.status(status).json({message})
})

app.listen(port, () => console.log('Example app listening on port : ' + port))
module.exports = app