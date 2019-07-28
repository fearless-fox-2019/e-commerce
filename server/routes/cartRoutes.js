const router = require('express').Router()
// const StudentController = require('../controller/studentController')
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
router.use(authentication)
router.post('/',CartController.createCart)
router.get('/:userId',CartController.findCart)
router.delete('/:id',CartController.deleteCart)
router.patch('/checkout',CartController.checkOut)

module.exports = router
