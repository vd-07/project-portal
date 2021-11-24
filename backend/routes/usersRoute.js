const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post("/register", forwardAuthenticated, (req, res) => {
  const { professorName, emailId, mobileNum, password, password2 } = req.body;
  let errors = [];

  if (!professorName || !emailId || !mobileNum || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(403).send(errors);
  } else {
    User.findOne({ emailId: emailId }).then((user) => {
      if (user) {
        errors.push({ msg: "emailId already exists" });
        res.status(403).send(errors);
      } else {
        const newUser = new User({
          professorName,
          emailId,
          mobileNum,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.status(200).send({
                  msg: "Succesfully registered! Please login",
                });
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

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
          message: "Successfully logged in!"
        });
      });
    }
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send({
    message: "Succesfully signed out",
  });
});

module.exports = router;
