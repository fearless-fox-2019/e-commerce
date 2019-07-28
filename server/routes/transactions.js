const router = require('express').Router()
const ControllerTransaction = require('../controllers/transactions')
const authentication = require('../middlewares/authentication')
const authorizeUser = require('../middlewares/authorizeUser')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const checkCart = require('../middlewares/checkCart')

router.use(authentication)
router.get('/', ControllerTransaction.findUser)
router.get('/admin', authorizeAdmin, ControllerTransaction.findAll )
router.post('/', checkCart, ControllerTransaction.makeTransaction)
router.patch('/delivered/:transactionId', ControllerTransaction.updateStatus)
router.delete('/:transactionId', ControllerTransaction.cancelTransaction)



module.exports = router