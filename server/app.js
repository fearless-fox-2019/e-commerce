if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000
const mongo =  process.env.DB_MONGOOSE || 'mongodb://localhost:27017/ecommerce'
const errHandler =  require('./middlewares/error');

// Encode From Url or Body EJS
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// + process.env.NODE_ENV
mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true}, function(err) {
  if (err) console.log(err);
  // else console.log('Mongoose Connected');
})
mongoose.set('useCreateIndex', true)

app.use(cors())
// app.use(morgan('tiny'))

// Routes Main
const routesIndex = require('./routes/routes.js');

//  Home Page
app.use('/', routesIndex)
app.use(errHandler)

app.listen(port, () => console.log(`Hello from port : ${port}! 😙`))

module.exports = app