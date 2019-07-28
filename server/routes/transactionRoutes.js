const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const {authentication, authorization} = require('../middlewares/middleware')

router.use(authentication)

router.post('/', TransactionController.create)
router.get('/:userId', TransactionController.findOne)

router.get('/', authorization.user, TransactionController.findAll)

module.exports = router