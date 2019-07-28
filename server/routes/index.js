const router = require("express").Router();
const userRoute = require("./user");
const itemRoute = require("./item");
const cartRoute = require("./cart");

router.get("/", (req, res) => {
    res.send("ToKuMu server is OK");
});

router.use("/auth", userRoute);
router.use("/items", itemRoute);
router.use("/carts", cartRoute);



module.exports = router;