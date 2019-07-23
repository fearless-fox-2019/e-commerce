const router = require('express').Router()
const images = require('../helpers/image')
const gameController = require('../controllers/gameController.js')

router.post('/', gameController.create)
router.get('/', gameController.findAll)
router.get('/findOne/:id', gameController.findOne)
router.delete('/:id', gameController.delete)
router.patch('/:id', gameController.updateGame)
router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
  (req, res) => {
    res.status(200).json(req.file.cloudStoragePublicUrl)
})

// router.get()
module.exports = router