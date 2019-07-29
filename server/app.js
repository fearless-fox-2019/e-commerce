if(process.env.NODE_ENV=='development' || !process.env.NODE_ENV || process.env.NODE_ENV=='test'){
    require('dotenv').config()
}

const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    app = express(),
    routes = require('./routes'),
    path = require('path'),
    errorHandler = require('./middleware/errorHandler')
    
const port = process.env.PORT
// Check mongoose connection
mongoose.connect(`mongodb://localhost/e-commerce-${process.env.NODE_ENV}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connect to mongodb')
});

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Routes
app.use('/api', routes)

// Error Handler
app.use(errorHandler)

app.listen(port, ()=> console.log('Listening on port', port))

module.exports = app