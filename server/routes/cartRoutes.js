const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/findAll/:id', CartController.findAll)
router.post('/create', CartController.create)
router.post('/delete/:id', CartController.delete)
router.post('/checkout/:id', CartController.checkout)

module.exports = router