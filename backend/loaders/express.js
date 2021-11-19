const cors = require("cors");
const session = require("express-session");
const errorHandler = require("errorhandler");
const config = require("../config");
const dashboardRoute = require("../routes/dashboardRoute");
const authRoute = require("../routes/authRoute");
require("../schemas/Professor");
require("../config/passport");

module.exports = async function (app, express) {
  if (config.NODE_ENV === "development") {
    app.use(errorHandler());
  }
  app.use(cors());
  app.use(require("morgan")("dev"));
  app.use(express.json());
  app.use(
    session({
      secret: "passport-tutorial",
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false,
    })
  );

  // importing routes
  app.use("/dashboard", dashboardRoute);
  app.use("/auth", authRoute);
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  });

  // invalid end point, not found
  app.use((req, res) => {
    const err = new Error(`404 not found`);
    res.status(404).send(err.message);
  });
  // ...More middlewares
  // Return the express app
  return app;
};
