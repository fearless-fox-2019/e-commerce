const router = require("express").Router();
const auth = require("../middlewares/auth");
const CartController = require("../controllers/cart");

router.post("/", auth.authenticate, CartController.create);
router.delete("/:id", auth.authenticate, auth.authorizedUserCart, CartController.delete);

module.exports = router;