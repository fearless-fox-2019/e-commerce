const router = require('express').Router()
const transactionController = require('../controllers/TransactionControler')
const {
    authentication,
    authorization
} = require('../middlewares/auth')

router.use('/', authentication)

router.get('/', transactionController.findAll)
router.get('/statusSearch', transactionController.findByStatus)
router.get('/userIdSearch', transactionController.findByUserId)
router.get('/:transactionId', transactionController.findOne)
router.post('/', transactionController.create)
router.patch('/:transactionId', authorization, transactionController.update)
router.delete('/:transactionId', authorization, transactionController.delete)

module.exports = router