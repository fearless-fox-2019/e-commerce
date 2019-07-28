const router = require("express").Router();
const auth = require("../middlewares/auth");
const ItemController = require("../controllers/item");
const multer = require("multer");
const gcsStorage = require("../middlewares/gcs");

const upload = multer({
    storage: multer.MemoryStorage,
    limits: {
        fileSize: 10 * (1024 * 1024) // Maximum file upload: 10 MB
    }
});

router.post("/", auth.authenticate, auth.authorizedAdmin, upload.single("image"), gcsStorage.sendUploadToGCS, ItemController.create);
router.put("/:id", auth.authenticate, auth.authorizedAdmin, upload.single("image"), gcsStorage.sendUploadToGCS, ItemController.update);

router.get("/", ItemController.findAll);
router.get("/:id", ItemController.findById);

router.delete("/:id", auth.authenticate, auth.authorizedAdmin, ItemController.delete);

module.exports = router;