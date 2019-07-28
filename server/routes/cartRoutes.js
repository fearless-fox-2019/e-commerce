const router = require('express').Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authetication')
const authorization = require('../middlewares/authorization')

router.post('/add', authentication, cartController.addCart)
router.get('/', authentication, cartController.getUserCart)
router.delete('/:id', authentication, authorization, cartController.deleteCart)

module.exports = router