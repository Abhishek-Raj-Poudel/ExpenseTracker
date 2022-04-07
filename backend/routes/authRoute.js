const router = require("express").Router();
const AuthController = require("../controller/authController");

const authController = new AuthController();

router.post("/", authController.login);

module.exports = router;
