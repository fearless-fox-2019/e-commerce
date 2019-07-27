const router = require('express').Router()
const images = require('../helpers/image')
const gameController = require('../controllers/gameController.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', gameController.findAll)
router.get('/findOne/:id', gameController.findOne)
router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
  (req, res) => {
    res.status(200).json(req.file.cloudStoragePublicUrl)
})
router.use(authentication)
router.post('/',  gameController.create)
router.delete('/:id', gameController.delete)
router.patch('/:id',  gameController.updateGame)

// router.get()
module.exports = router