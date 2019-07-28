if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const route = require('./routes/index.js')
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')

//MONGOOSE
let collection = 'petzone'
if(process.NODE_ENV === 'test') {
  collection += '-test'
}

mongoose.connect(`mongodb://localhost/${collection}`, {useNewUrlParser: true}, function(err){
  if (err) throw err
  else console.log('success connect to database')
});

//URL ENCODED
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

//Cors
app.use(cors())

//Initialize routes
app.use('/api', route)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
})


module.exports = app