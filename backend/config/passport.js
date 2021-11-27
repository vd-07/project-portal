const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

module.exports = function (passport) {
  // define strategy for authentication
  passport.use(
    new LocalStrategy(
      { usernameField: "emailId" },
      (emailId, password, done) => {
        // Match user
        User.findOne({
          emailId: emailId,
        }).then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That emailId is not registered",
            });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        });
      }
    )
  );

  // to save user data after authentication
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // to retrieve user data from session
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
