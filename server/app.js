if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express')
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

let url = 'mongodb://localhost:27017/e-commerce-' + process.env.NODE_ENV


mongoose.connect(url, {
    useNewUrlParser: true
}, (err) => {
    if (err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

app.use(function (err, req, res, next) {
    console.log('error handling');
    console.log('err: ', err);
})

// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })
module.exports = app