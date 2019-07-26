const router= require('express').Router()
const userRoute= require('./user')
const itemRoute= require('./item')
const cartRoute= require('./cart')
const transactionRoute= require('./transaction')


router.use('/users', userRoute)
router.use('/items', itemRoute)
router.use('/cart', cartRoute)
router.use('/transaction', transactionRoute)


module.exports= router