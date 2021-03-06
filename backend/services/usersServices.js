const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

module.exports = {
  register: (req, res) => {
    const { professorName, emailId, mobileNum, password, password2 } = req.body;
    let errors = [];

    // edge cases
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
      // Register
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
          // save the hash of password by generating a salt
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
  },
  login: (req, res, next) => {
    // using passport to authenticate
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send({
          message: "User not found / Incorrect Password",
        });
      } else {
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
  },
  logout: (req, res) => {
    req.logout();
    res.status(200).send({
      message: "Succesfully signed out",
    });
  },
};
