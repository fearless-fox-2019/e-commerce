const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user-controller')
const CartController = require('../controllers/cart-controller')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)

router.use(auth.authentication)

router.post('/cart/:productId', CartController.create)
router.get('/cart', CartController.getUserCart)
router.delete('/cart/delete/:productId', CartController.deleteOne)

module.exports = router