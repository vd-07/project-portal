const passport = require("passport");
const Professor = require("../schemas/Professor");

module.exports = {
  login: async (req, res) => {
    const {
      body: { user },
    } = req;

    if (!user.email) {
      res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }

    try {
      const handler = passport.authenticate(
        "local",
        // { session: false },
        (err, passportUser, info) => {
          if (err) {
            res.send({
              message: err.message,
            });
          }

          if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() });
          }

          res.status(401).json(info);
        }
      );
      handler(req, res);
    } catch (err) {
      res.send({
        message: err.message,
      });
    }
  },
  signup: async (req, res) => {
    const {
      body: { user },
    } = req;

    if (!user.email) {
      res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }

    const finalUser = new Professor(user);

    finalUser.setPassword(user.password);

    try {
      await finalUser
        .save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    } catch (err) {
      res.send({
        message: err.message,
      });
    }
  },
};
