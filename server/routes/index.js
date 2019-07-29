const express = require('express');
const Router = express.Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const transactionRoutes = require('./transaction');

// Resource routes
Router.use('/users', userRoutes);
Router.use('/products', productRoutes);
Router.use('/transactions', transactionRoutes);

module.exports = Router;