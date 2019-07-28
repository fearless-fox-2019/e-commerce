const router = require('express').Router()
// const StudentController = require('../controller/studentController')
const CartController = require('../controllers/cartController')

router.post('/',CartController.createCart)
router.get('/:userId',CartController.findCart)
router.delete('/:id',CartController.deleteCart)

module.exports = router
