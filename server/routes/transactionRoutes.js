const router = require('express').Router()
const transactionController = require('../controllers/TransactionControler')
const {authentication, sent_authorization, admin_authorization} = require('../middlewares/auth')

router.use('/', authentication)

router.get('/', transactionController.findAll)
router.get('/statusSearch', transactionController.findByStatus)
router.get('/userIdSearch/:userId', transactionController.findByUserId)
router.get('/:transactionId', transactionController.findOne)
router.post('/', transactionController.create)
router.patch('/:transactionId', sent_authorization, transactionController.update)
router.delete('/:transactionId', admin_authorization, transactionController.delete)

module.exports = router
