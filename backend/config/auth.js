module.exports = {
  // only proceed if authenticated
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    // else throw unauthorized error
    res.status(401).send({
      message: "Please log in to view that resource",
    });
  },
  forwardAuthenticated: function (req, res, next) {
    // if not authenticated then only proceed for authenticationn
    if (!req.isAuthenticated()) {
      return next();
    }
  },
};
