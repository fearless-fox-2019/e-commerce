const router = require('express').Router()

const productRouter = require('./productRouter')
const transactionRouter = require('./transactionRouter')
const userController = require('../controller/userController')
const authentication = require('../middleware/authentication')

// User's part
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)

// Product's part
router.use('/product', productRouter)


// Transaction's part
router.use(authentication)
router.get('/authentication', userController.getVerify)
router.patch('/user/cart', userController.emptyCart)
router.patch('/user/cart/add/:productId', userController.productToCart)
router.patch('/user/cart/remove/:productId', userController.removeProductFromCart)
router.get('/user/cart', userController.cart)
router.use('/transaction', transactionRouter)

module.exports = router