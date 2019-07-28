if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express');
const routes = require('./routes/');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const errHandling = require('./middlewares/errHandler')
const cors = require('cors')

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true})
  .then(()=> {
    console.log('Database development connected')
  })
  .catch(err => {
    console.log('Database failed to connect')
  })
} else if (!process.env.NODE_ENV) {
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true})
  .then(()=> {
    console.log('Database production connected')
  })
  .catch(err => {
    console.log('Database failed to connect')
  })
}

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', routes);
app.use(errHandling)
app.listen(port, function() {
  console.log('App listening on port', port);
});

module.exports = app