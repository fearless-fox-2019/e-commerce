const express = require('express');
const router = express.Router();
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const transaction = require('./transaction');
const authenticate = require('../middlewares/authenticate');

router.use('/users', user);
// router.use();
router.use('/products', product);
router.use('/carts', authenticate, cart);
router.use('/transactions', authenticate, transaction);

module.exports = router;