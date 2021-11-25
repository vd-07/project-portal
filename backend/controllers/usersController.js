const usersServices = require("../services/usersServices");

module.exports = {
    register: (req, res, next) => {
        usersServices.register(req, res, next);
    },
    login: (req, res, next) => {
        usersServices.login(req, res, next);
    },
    logout: (req, res, next) => {
        usersServices.logout(req, res, next);
    }
}