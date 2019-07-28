const router = require('express').Router()
const ShoeController = require('../controllers/shoesController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
router.get('/allShoes',ShoeController.findAll)
router.get('/:id',ShoeController.shoeDetail)
router.use(authentication,authorization)
router.patch('/updateData/:id', ShoeController.updateShoe)
router.post('/',ShoeController.create)
router.patch('/:id',ShoeController.update)
router.delete('/:id',ShoeController.delete)

module.exports = router
