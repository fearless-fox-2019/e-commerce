const router = require('express').Router()
const product = require('../controllers/productController')
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')

router.get('/list', product.list);
router.use(authenticate)
router.post('/create', authorization, product.create);
router.patch('/update/:id', authorization, product.update);
router.delete('/delete/:id', authorization, product.delete);

module.exports = router