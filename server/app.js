require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const routes = require('./routes');
const port = process.env.PORT || 3000
const url = process.env.MONGODB_URL || `mongodb://localhost:27017/e-commerce2`
const errorHandler = require('./middlewares/error-handler')
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if(err) console.log('mongo error')
  else console.log('mongoose connected')
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;


app.listen(port, () => console.log(`listening on port`, port))

