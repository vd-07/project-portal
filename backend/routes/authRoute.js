const express = require("express");
const router = express.Router();
const auth = require("../services/handleAuth");
const authController = require("../controllers/authController");

router.post("/signup", auth.optional, authController.signup);
router.post("/login", auth.optional, authController.login);

module.exports = router;