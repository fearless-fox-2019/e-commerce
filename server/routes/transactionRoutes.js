const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
// const StudentController = require('../controller/studentController')
const authentication = require('../middlewares/authentication')
router.use(authentication)
router.post('/',TransactionController.createTransaction)
router.get('/',TransactionController.getTransactions)
module.exports = router
