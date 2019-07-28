const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', transactionController.create)
router.get('/', transactionController.findTransaction)
module.exports = router