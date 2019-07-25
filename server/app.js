if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes')
const {
    errHandler
} = require('./middlewares/errHandler')

const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    mongoose.connect(`${process.env.DB_SERVER}-${process.env.NODE_ENV}`, {
        useNewUrlParser: true, useFindAndModify: false
    }, (err) => {
        if (err) console.log(err), console.log(`Can't connect to mongoose server.`);
        else console.log(`Mongoose connect success`)
    })
} else if (process.env.NODE_ENV === 'production') {
    mongoose.connect(`${process.env.DB_SERVER_ATLAS}`, {
        useNewUrlParser: true
    }, (err) => {
        if (err) console.log(err), console.log(`Can't connect to mongoose server.`);
        else console.log(`Mongoose connect success`)
    })
}

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use('/', router)

app.use(errHandler)

if (process.env.NODE_ENV === 'test') {
    module.exports = app
} else if (process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
        console.log('Connection Success !!!')
    })
}