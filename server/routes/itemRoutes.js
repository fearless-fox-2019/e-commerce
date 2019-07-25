const router = require('express').Router()
const itemController = require('../controllers/itemController')
const {
    authentication,
    authorization
} = require('../middlewares/auth')
const {
    multer,
    UploadToGCS
} = require('../middlewares/gcs')

router.get('/', itemController.findAll) // 
router.get('/search', itemController.search) // dipisahkanberdasarkan query yang dipakai ?name, ?tag, ?category
router.get('/:itemId', itemController.findOne) //
router.get('/search/name',itemController.searchByName) // =========> query yang dipakai ?name
router.get('/search/tag',itemController.searchByTag) // =========> query yang dipakai ?tag
router.get('/search/category',itemController.searchByCategory) // =========> query yang dipakai ?category
// router.get('/search/rate',itemController.searchByRate) // =========> query yang dipakai ?category

router.use('/', authentication)

router.post('/', multer.single('image'), UploadToGCS, itemController.create) //
router.patch('/:itemId', multer.single('image'), UploadToGCS, itemController.update) //
// router.patch('/rate/:itemId',itemController.rate) // 
// router.patch('/review/:itemId',itemController.review) //

router.delete('/:itemId', itemController.delete)

module.exports = router