const router = require('express').Router()
const transactionController = require ('../controllers/transactionController')
const auth = require('../middlewares/authent');

router.post('/', auth, transactionController.create)
router.get('/', auth, transactionController.read)
router.get('/all', auth, transactionController.readAll)

module.exports = router