const router = require('express').Router()
const ControllerCart = require('../controllers/carts')
const authentication = require('../middlewares/authentication')
const authorizeUser = require('../middlewares/authorizeUser')
const checkProduct = require('../middlewares/checkProduct')

router.use(authentication)

router.get('/', authorizeUser, ControllerCart.findAll)
router.post('/', authorizeUser, checkProduct, ControllerCart.addToCart)
router.patch('/deleteProduct/:cartId', authorizeUser, ControllerCart.deleteProduct)
router.delete('/deleteCart/:cartId', authorizeUser, ControllerCart.deleteCart)

module.exports = router