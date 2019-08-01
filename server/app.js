if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const errorHandlers = require('./middlewares/error-handlers');

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://localhost/e-commerce`, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use(errorHandlers);

app.listen(port, () => console.log(`Running on http://localhost:${port}`))
