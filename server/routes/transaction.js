const route = require('express').Router()
const TransactionCon = require('../controllers/transactionController')
const { transactionAuthorization , authentication} = require('../middlewares/auth')

route.get('/', TransactionCon.getAll)
route.get('/:id', TransactionCon.getOne)
route.post('/', authentication ,TransactionCon.create)
route.patch('/:id/:productId', transactionAuthorization, TransactionCon.update)

module.exports = route