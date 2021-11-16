const dashboardSerives = require("../services/dashboard");

module.exports = {
  getProfessorData: (req, res, next) => {
    dashboardSerives.getProfessorData(req.params, res).catch(next);
  },
  createProfessor: (req, res, next) => {
      dashboardSerives.createProfessor(req, res).catch(next);
  },
  createProject: (req, res, next) => {
    dashboardSerives.createProject(req, res).catch(next);
  },
  deleteProject: (req, res, next) => {
      dashboardSerives.deleteProject(req.params, res).catch(next);
  }
};
