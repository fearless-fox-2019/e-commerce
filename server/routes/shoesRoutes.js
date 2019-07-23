const router = require('express').Router()
const ShoeController = require('../controllers/shoesController')
router.post('/addShoe',ShoeController.create)
module.exports = router
