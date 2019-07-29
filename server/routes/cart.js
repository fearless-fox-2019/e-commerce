const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart-controller');

router.get('/', CartController.findAll);
router.post('/', CartController.create);
router.delete('/:id', CartController.destroy);

module.exports = router