const router = require("express").Router();

//routers
const userRoute = require("./userRoute");
const shopRoute = require("./shopRoute");
const productRoute = require("./productRoute");
const orderRoute = require("./orderRoute");
const categoryRoute = require("./categoryRoute");
const adminRoute = require("./adminRoute");
const authRoute = require("./authRoute");

const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");

router.use("/auth", authRoute);

router.use("/admin", [isLoggedIn, isAdmin], adminRoute);

router.use("/category", categoryRoute);
router.use("/order", orderRoute);
router.use("/product", productRoute);
router.use("/shop", shopRoute);
router.use("/user", userRoute);

module.exports = router;
