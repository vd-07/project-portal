const dashboardSerives = require("../services/dashboardServices");

module.exports = {
  getProfessorData: (req, res, next) => {
    dashboardSerives.getProfessorData(req, res).catch(next);
  },
  createProject: (req, res, next) => {
    dashboardSerives.createProject(req, res).catch(next);
  },
  deleteProject: (req, res, next) => {
      dashboardSerives.deleteProject(req, res).catch(next);
  }
};
