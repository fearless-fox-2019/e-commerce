const router = require('express').Router()
const Cart = require('../controllers/cart')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
// add to cart
router.post('/', Cart.addToCart)
// byUserId
router.get('/:userid', Cart.getAllByUserId)
router.delete('/:id', Cart.deleteProduct)
// byProductId for admin
router.get('/:productid', Cart.getAllByProductId)

module.exports = router