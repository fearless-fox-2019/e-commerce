const express = require("express")
const router = express.Router()
const userRouter = require("./user-route")
const productRouter = require("./product-route")
const cartRouter = require("./cart-route")

router.use("/carts", cartRouter)
router.use("/users", userRouter)
router.use("/products", productRouter)

module.exports = router
