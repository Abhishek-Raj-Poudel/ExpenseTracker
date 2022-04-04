const router = require("express").Router();
const { adminDashboard } = require("../controller/baseController");

router.route("/").get(adminDashboard);

module.exports = router;
