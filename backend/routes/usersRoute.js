const express = require("express");
const router = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const usersController = require("../controllers/usersController");
const passport = require("passport");

// Register
router.post("/register", forwardAuthenticated, usersController.register);

// Login
router.post("/login", forwardAuthenticated, (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send({
        message: "User not found / Incorrect Password",
      });
    } else {
      // console.log(user);
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).send({
          message: "Successfully logged in!",
        });
      });
    }
  })(req, res, next);
});

// Logout
router.get("/logout", usersController.logout);

module.exports = router;
