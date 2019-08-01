const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', CartController.addToCart)
router.get('/', CartController.getAllCart)
router.delete('/:id', CartController.delete)
router.get('/:id', CartController.findOneUncheckedOut)
router.patch('/:id', CartController.updateStatus)
module.exports = router