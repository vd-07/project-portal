const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Project = require("../schemas/Professor");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    (email, password, done) => {
      Project.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
