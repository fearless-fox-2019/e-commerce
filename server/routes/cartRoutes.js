const router = require('express').Router()
const CartController = require('../controllers/cartController')
const {authentication, authorization} = require('../middlewares/middleware')

router.use(authentication)
router.post('/', authorization.customer, CartController.create)
router.get('/:userId', authorization.customer, CartController.findByUser)
router.delete('/:id', authorization.customer, authorization.cart, CartController.delete)

module.exports = router