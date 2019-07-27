const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', CartController.addToCart)

module.exports = router