if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  require('dotenv').config()
  console.log('on development')
}

const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes');
const port = process.env.PORT || 3000
const url = process.env.MONGODB_URL || `mongodb://localhost:27017/e-commerce2-${process.env.NODE_ENV}`
const errorHandler = require('./middlewares/error-handler')
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if(err) console.log('mongo error')
  else console.log('mongoose connected')
});
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;


app.listen(port, () => console.log(`listening on port`, port))