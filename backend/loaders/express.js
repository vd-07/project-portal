const cors = require("cors");
const dashboardRoute = require("../routes/dashboardRoute");
const usersRoute = require("../routes/usersRoute");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

require("../config/passport")(passport);

module.exports = async function (app, express) {
  app.use(cors({ credentials: true, origin: true }));
  app.use(require("morgan")("dev"));
  app.use(express.json());
  // Express session
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      HttpOnly: true,
      Path: "/",
      cookie: {
        maxAge: 60000
      }
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Connect flash
  app.use(flash());

  // importing routes
  app.use("/dashboard", dashboardRoute);
  app.use("/users", usersRoute);

  // invalid end point, not found
  app.use((req, res) => {
    const err = new Error(`404 not found`);
    res.status(404).send(err.message);
  });
  // ...More middlewares
  // Return the express app
  return app;
};