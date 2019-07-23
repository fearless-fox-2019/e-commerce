const router = require("express").Router();
const authRoute = require("./auth");
const itemRoute = require("./item");

router.get("/", (req, res) => {
    res.send("router is working");
});

router.use("/auth", authRoute);
router.use("/items", itemRoute);


module.exports = router;