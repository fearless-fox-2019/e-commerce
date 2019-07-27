const router= require('express').Router()
const transactionController= require('../controllers/transactionController')
const authencation= require('../middlewares/authenticate')

router.use(authencation)
router.get('/', transactionController.findAll)
router.get('/customer/:custId', transactionController.findAllCust)
router.post('/', transactionController.create)
router.patch('/:id', transactionController.update)
router.delete('/:id', transactionController.remove)

module.exports= router