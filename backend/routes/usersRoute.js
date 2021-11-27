const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const usersController = require("../controllers/usersController");

// Register
router.post("/register", forwardAuthenticated, usersController.register);

// Login
router.post("/login", forwardAuthenticated, usersController.login);

// Logout
router.get("/logout", usersController.logout);

module.exports = router;
