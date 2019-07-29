if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

mongoose.connect(`${process.env.DB_PATH}-${process.env.NODE_ENV}`, {useNewUrlParser : true, useCreateIndex : true, useFindAndModify : false}, (err) => {
    if(err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app