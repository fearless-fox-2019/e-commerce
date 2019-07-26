const router= require('express').Router()
const cartController= require('../controllers/cartController')
const authentication= require('../middlewares/authenticate')
const {authorizeCust}= require('../middlewares/authorize')

router.use(authentication)
router.get('/', cartController.findAll)
router.post('/', cartController.create)
router.patch('/increment/:id', authorizeCust, cartController.updateInc)
router.patch('/decrement/:id', authorizeCust, cartController.updateDec)
router.delete('/:id', authorizeCust, cartController.remove)


module.exports= router