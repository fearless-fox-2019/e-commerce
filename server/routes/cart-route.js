const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cart-controller")
const authenticate = require('../middlewares/authenticate')
// const authorization = require('../middlewares/authorizations')
router.use(authenticate)
router.post("/", cartController.create)
router.get("/",cartController.get)
router.get("/:id",cartController.getOne)
// router.put("/:id",authorization,cartController.update)
// router.delete("/:id",authorization,cartController.destroy)


module.exports = router