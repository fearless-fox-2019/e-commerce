const router = require("express").Router();
const ItemController = require("../controllers/item");

router.post("/", ItemController.create);
router.get("/", ItemController.findAll);

router.get("/:id", ItemController.findById);
router.put("/:id", ItemController.update);

module.exports = router;