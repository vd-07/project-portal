const authServices = require("../services/authServices");

module.exports = {
  login: async (req, res, next) => {
    await authServices.login(req, res).catch(next);
  },
  signup: async (req, res, next) => {
    await authServices.signup(req, res).catch(next);
  },
};
